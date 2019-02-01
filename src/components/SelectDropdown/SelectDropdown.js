import React, { Component } from 'react';
import formConfig from './formConfig';
import FormElementGenerator from '../SharedComponents/FormElementGenerator/FormElementGenerator';

class SelectDropdown extends Component {
    render () {
        return (
            <div>
                <FormElementGenerator formConfig={formConfig} />
            </div>
        );
    }
}

export default SelectDropdown;