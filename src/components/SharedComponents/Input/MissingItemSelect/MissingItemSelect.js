import React, { Component } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import SelectBox from '../NormalSelect/NormalSelect';

class MissingItemSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            value: this.props.value
        };
    }

    changeHandler = (e) => {
        const syntacticEventObj = {
            target: {
                value: ''
            }
        };

        syntacticEventObj.target.value = e.target.value;
        this.props.changed(syntacticEventObj);

    }

    textBoxToggle = (e) => {
        this.setState({ showInput: e.target.checked });
    }

    render() {
        return (
            <div className='missing-item-select'>
                <SelectBox
                    id={this.props.id}
                    classes={this.props.classes}
                    value={this.props.value}
                    changed={this.props.changed}
                    options={this.props.options}
                    touched={this.props.touched}
                />
                <FormGroup>
                    <Label><Input type="checkbox" onChange={this.textBoxToggle} />{this.props.checkBoxLabel}</Label>
                </FormGroup>
                {this.state.showInput && <FormGroup>
                    <Input type="text" value={this.props.value} placeholder={this.props.textBoxPlaceHolder} onChange={this.changeHandler} />
                </FormGroup>}

            </div>
        );
    }
}
export default MissingItemSelect;

