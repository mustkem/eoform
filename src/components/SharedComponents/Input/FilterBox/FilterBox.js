import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export class FilterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    toggleHandler = () => {
        this.setState({ show: !this.state.show });
    }
    cheaged = (e) => {
        const current = e.target.parentNode.parentNode;
        const values = [];
        current.querySelectorAll(`input[type="checkbox"]`).forEach(item => {
            if (item.checked === true) {
                values.push(item.value);
            }
        });
        const value = values.join(',');
        const syntacticEventObj = {
            target: {
                value: ''
            }
        };
        syntacticEventObj.target.value = value;
        this.props.changed(syntacticEventObj);
    }
    render() {
        return (
            <div className={"filter-box-wrap" + this.props.classes}>
                <div className="label-warp">
                    <div className="label-head">
                        <button onClick={this.toggleHandler} type="button">
                        {this.props.label ? <h4>{this.props.labelText}</h4> : null}
                            {this.state.show ? <i className="fa fa-minus" aria-hidden="true"></i> : <i className="fa fa-plus" aria-hidden="true"></i>}
                        </button>
                    </div>
                    <FormGroup className={this.state.show ? 'slideDown' : 'slideUp'}>
                        {this.props.elementConfig.options.map(item => (
                            <Label key={item.value}>
                                <Input type="checkbox" checked={this.props.value.includes(item.value)} onChange={this.cheaged} value={item.value} name={this.props.name} /> {item.label}
                                <i className="custom-check"></i>
                            </Label>
                        ))}
                    </FormGroup>
                </div>
            </div>
        );
    }
}
