import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { FormGroup } from 'reactstrap';


class RangeSliderSingle extends Component {
    changeHandler = (v) => {
        const value = parseFloat(v);
        const syntacticEventObj = {
            target: {
                value: ''
            }
        };
        syntacticEventObj.target.value = this.isFloat(value) ? value.toFixed(1) : value;
        this.props.changed(syntacticEventObj);
    }
    isFloat = (n) => {
        return !isNaN(n) && n.toString().indexOf('.') !== -1;
    }
    render() {
        let value = parseFloat(this.props.value);
        return <div className={"filter-box-wrap rang-slider-single" + this.props.classes}>
            <FormGroup>
                {this.props.label && <label>{this.props.labelText}</label>}
                {this.props.elementConfig.showCurrentValue && <span className="current-value">{this.props.elementConfig.valueLabelPreFix ?
                    `${this.props.elementConfig.valueLabel}${value}` :
                    `${value}${this.props.elementConfig.valueLabel}`}</span>}
                <InputRange
                    allowSameValues={true}
                    minValue={this.props.elementConfig.min}
                    maxValue={this.props.elementConfig.max}
                    step={this.props.elementConfig.step}
                    formatLabel={value => this.props.elementConfig.valueLabelPreFix ?
                        `${this.props.elementConfig.valueLabel}${value}` :
                        `${value}${this.props.elementConfig.valueLabel}`
                    }
                    value={this.isFloat(value) ? parseFloat(value.toFixed(1)) : Number.parseInt(value, 10)}
                    onChange={this.changeHandler}
                />
                {this.props.elementConfig.showMinMax && <span className="min-max-wrapper">
                    <span className="min">{this.props.elementConfig.valueLabelPreFix ?
                        `${this.props.elementConfig.valueLabel}${this.props.elementConfig.min}` :
                        `${this.props.elementConfig.min}${this.props.elementConfig.valueLabel}`}</span>
                    <span className="max">{this.props.elementConfig.valueLabelPreFix ?
                        `${this.props.elementConfig.valueLabel}${this.props.elementConfig.max}` :
                        `${this.props.elementConfig.max}${this.props.elementConfig.valueLabel}`}</span>
                </span>}
            </FormGroup>
        </div>
    }

}
export default RangeSliderSingle;