import React, { Component } from 'react';
import Select from 'react-select';

class SelectBoxV2 extends Component {
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        const syntacticEventObj = {
            target: {
                value: ''
            }
        };
        syntacticEventObj.target.value = selectedOption ? selectedOption.value : '';
        this.props.changed(syntacticEventObj, this.clearStateValue);
    }

    render() {
        const placeholder = this.props.options[0].label;
        const options = [...this.props.options];
        if (options.length) {
            options.shift();
        }
        const selectedOptionArr = options.filter(option => option.value === this.props.value)
        const selectedOption = selectedOptionArr.length ? selectedOptionArr[0] : null;
        return (
            <Select
                styles={customStyles}
                aria-labelledby={this.props.id}
                isClearable={true}
                placeholder={placeholder}
                className={this.props.classes.replace("form-control", "")}
                classNamePrefix="carteckh"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
        );

    }
}
export default SelectBoxV2;

const customStyles = {
    option: (provided, state) => ({
        ...provided,
    }),
}