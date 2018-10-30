import React, { Component } from 'react';
import formConfig from './formConfig';
import FormGenerator from './FormGenerator';

class ContactData extends Component {
    render () {
        return (
            <div>
                <FormGenerator formConfig={formConfig} />
            </div>
        );
    }
}

export default ContactData;