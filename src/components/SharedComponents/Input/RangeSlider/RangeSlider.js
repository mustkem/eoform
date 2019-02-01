import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { split } from 'ramda'
import { FormGroup } from 'reactstrap';


class RangeSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }

    }

    toggleHandler = () => {
        this.setState({ show: !this.state.show });
    }

    changeHandler = (value) => {
            if (value.min < this.props.elementConfig.min) {
                value.min = this.props.elementConfig.min;
            }
            if (value.max > this.props.elementConfig.max) {
                value.max = this.props.elementConfig.max;
            }

            const syntacticEventObj = {
                target: {
                    value: ''
                }
            };
            syntacticEventObj.target.value = value.min + '-' + value.max;
            this.props.changed(syntacticEventObj);
    }

    render() {
        let tempValue = this.props.value;
        if(!tempValue){
            tempValue = this.props.elementConfig.min+'-'+this.props.elementConfig.max;
        }
        const valueArray = split('-', tempValue);
        const value = { min: +valueArray[0], max: +valueArray[1] }
        return <div className={"filter-box-wrap rang-slider" + this.props.classes}>
            <div className="label-warp">
                <div className="label-head">
                    <button onClick={this.toggleHandler} type="button">
                        {this.props.label ? <h4>{this.props.labelText}</h4> : null}
                        {this.state.show ? <i className="fa fa-minus" aria-hidden="true"></i> : <i className="fa fa-plus" aria-hidden="true"></i>}
                    </button>
                </div>
                <FormGroup className={this.state.show ? 'slideDown' : 'slideUp'}>
                    <InputRange
                        minValue={this.props.elementConfig.min}
                        maxValue={this.props.elementConfig.max}
                        step={this.props.elementConfig.step}
                        formatLabel={value => `${value}${this.props.elementConfig.valueLabel}`}
                        value={value}
                        onChange={this.changeHandler}
                    />
                </FormGroup>
            </div>
        </div>
    }

}
export default RangeSlider;