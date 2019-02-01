import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import { type } from 'ramda';

import { updateObject, checkValidity } from '../../../shared/utility';
import InputField from '../Input/Input';

class FormElementGenerator extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formElements: this.props.formConfig,
            formIsValid: false,
        }
        this.initialConfig = this.deepCopy(this.props.formConfig);
        this.filterRef = React.createRef();
    }


    inputChangedHandler = (event, inputIdentifier, clearElement) => {
        const updatedFormElement = updateObject(this.state.formElements[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.formElements[inputIdentifier].validation),
            touched: true,
            clearElement: clearElement ? clearElement : null
        });

        const updatedFormElements = updateObject(this.state.formElements, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedFormElements) {
            formIsValid = updatedFormElements[inputIdentifier].valid && formIsValid;
        }
        if (!this.props.filter) {
            this.setState({ formElements: updatedFormElements, formIsValid: formIsValid });
        } else {

            this.setState({ formElements: updatedFormElements, formIsValid: formIsValid }, () => {
                if (this.state.formIsValid) {
                    const dataToPost = {};
                    Object.keys(this.state.formElements).forEach(key => {
                        dataToPost[key] = this.state.formElements[key].value;
                    });
                    if (this.props.submitFunc) {
                        this.props.submitFunc(dataToPost);
                    }
                }
            });
        }
    }


    submitHandler = e => {
        e.preventDefault();
        Object.keys(this.state.formElements).forEach(item => {
            if (this.state.formElements[item].clearElement) {
                this.state.formElements[item].clearElement();
            }
        });
        const dataToPost = {};
        Object.keys(this.state.formElements).forEach(key => {
            dataToPost[key] = this.state.formElements[key].value;
        });

        if (this.props.submitFunc) {
            this.props.submitFunc(dataToPost);
        } else {
            console.log(dataToPost);
        }
        this.setState({ formIsValid: false });

    }
    deepCopy = (src) => {
        let target = ("Array" === type(src)) ? [] : {};
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                if ('object' === typeof src[prop]) {
                    target[prop] = this.deepCopy(src[prop]);
                } else {
                    target[prop] = src[prop];
                }
            }
        }
        return target;
    }
    clearMe = () => {
        const formElements = { ...this.state.formElements };
        Object.keys(formElements).forEach(key => {
            formElements[key].value = '';
            formElements[key].touched = this.initialConfig[key].touched;
            formElements[key].valid = this.initialConfig[key].valid;
            if (formElements[key].clearElement) {
                formElements[key].clearElement();
            }
        });
        this.setState({ formElements: formElements });
    }

    componentDidMount() {
        const thisForm = this.filterRef.current;
        if (thisForm) {
            thisForm.asReactElement = this;
        }

    }

    /*static getDerivedStateFromProps(props, state) {
        Object.keys(props.formConfig).forEach(key => {
            if (!isEmpty(state.formElements[key].value) && !state.formElements[key].touched && state.formElements[key].value !== props.formConfig[key].value) {
                state.formElements[key].value = props.formConfig[key].value;
            }
        });
        return state;
    }*/

    render() {
        const formElementsArray = [];
        for (let key in this.state.formElements) {
            formElementsArray.push({
                key: key,
                config: this.state.formElements[key]
            });
        }
        const innerForm = formElementsArray.map(formElement => (
            <InputField
                classes={formElement.config.classes}
                key={formElement.config.labels.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event, clearElement) => this.inputChangedHandler(event, formElement.key, clearElement)}
                name={formElement.key}
                ext={formElement.config.ext}
                requiredStar={formElement.config.requiredStar}
                {...formElement.config.labels}
            />
        ));

        let form = this.props.hideFormTag ? <div ref={this.filterRef} data-filter={true} className={this.props.formClass}>{innerForm}</div> :
            <Form className={this.props.formClass} onSubmit={this.submitHandler}>
                {innerForm}
                {(!this.props.filter && this.props.buttonText) ? <Button color={this.props.color ? this.props.color : "primary"} className={this.props.buttonClass} disabled={!this.state.formIsValid}>{this.props.buttonText}</Button> : null}
            </Form>;

        return form;
    }

}

FormElementGenerator.propTypes = {
    filter: PropTypes.bool,
    buttonText: PropTypes.string,
    formConfig: PropTypes.object.isRequired,
    formClass: PropTypes.string,
    color: PropTypes.string,
    submitFunc: PropTypes.func,
    hideFormTag: PropTypes.bool
}
export default FormElementGenerator;