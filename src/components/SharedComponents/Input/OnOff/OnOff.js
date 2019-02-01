import React, { Component } from 'react';
import { Label, Input, FormGroup } from 'reactstrap';

class OnOff extends Component {
    constructor(props) {
        super(props);
        this.changed = this.changed.bind(this);
        this.state = {
            checked: false
        }
    }
    changed(value) {
        let syntacticEventObj = {
            target: {
                value: ''
            }
        };
        this.setState({
            checked: this.state.checked?'':1
        }, () => {
            syntacticEventObj.target.value = this.state.checked;
            this.props.changed(syntacticEventObj);
        })
    }

    render() {
        return (
            <FormGroup>
                <Label className={`${this.state.checked ? "active" : ''}`}>
                    <Input
                        type="checkbox"
                        onChange={() => this.changed()}
                        checked={`${this.state.checked ? "checked" : ''}`}
                        name={this.props.name}
                    />
                    <i className="custom-radio"></i>
                </Label>
                {this.props.label && <span className="term-con">{this.props.labelText}</span>}
            </FormGroup>
        );
    }
}

export default OnOff;