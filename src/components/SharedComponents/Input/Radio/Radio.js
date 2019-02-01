import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.changed = this.changed.bind(this);
    }
    changed(value) {
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
            <div className={"radio-input" + this.props.classes}>
                {this.props.label && <h3>{this.props.labelText}</h3>}

                <FormGroup>
                    {this.props.elementConfig.options.map(item => (

                        <Label key={item.value} className={String(this.props.value) === String(item.value) ? 'active' : null}>
                            <Input
                                type="radio"
                                onChange={() => this.changed(item.value)}
                                checked={String(this.props.value) === String(item.value)}
                                name={this.props.name}
                            /> {item.label}
                            <i className="custom-radio"></i>
                        </Label>
                    ))}
                </FormGroup>
            </div>
        );
    }
}


export default Radio;