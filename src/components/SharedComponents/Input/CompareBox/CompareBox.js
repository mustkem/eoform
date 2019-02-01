import React, { Component } from 'react';
import axios from 'axios';
import { path } from 'ramda';

import FormElementGenerator from '../../FormElementGeneratorV2/FormElementGeneratorV2';
import { API_PROXY_ROUTE } from '../../../../../config';


const axiosInstance = axios.create({
    baseURL: API_PROXY_ROUTE
});

class CompareBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.ext.productImageURL
        }
        this.prevValue = {
            brand: path(['elementConfig', 'brand', 'value'], this.props),
            model: path(['elementConfig', 'model', 'value'], this.props),
            variant: path(['elementConfig', 'variant', 'value'], this.props)
        };
        this.variantData = null;
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (this.prevValue.brand && this.prevValue.model) {
            const fatchURL = this.props.ext['model'].fatchURL + '/' + this.prevValue.brand + '/' + this.prevValue.model + '/variants';
            axiosInstance.get(fatchURL).then(responce => {
                this.variantData = responce.data.data;
            });
        }

    }

    changeHandler = value => {
        const form = this.formRef.current;

        const key = this.compareObj(this.prevValue, value);
        if ('brand' === key) {
            if (value['brand']) {
                const fatchURL = this.props.ext['model'].fatchURL + '/' + value['brand'];
                axiosInstance.get(fatchURL).then(responce => {
                    const data = this.props.ext.dataFormateFunc(responce);
                    const configCopy = { ...form.state.formElements };
                    configCopy['model'].elementConfig.options = [configCopy['model'].elementConfig.options[0], ...data];
                    configCopy['model'].value = '';
                    configCopy['variant'].value = '';
                    value['model'] = '';
                    value['variant'] = '';
                    form.setState({ formElements: configCopy });

                });
            } else {
                const configCopy = { ...form.state.formElements };
                configCopy['model'].elementConfig.options = [configCopy['model'].elementConfig.options[0]];
                configCopy['variant'].elementConfig.options = [configCopy['variant'].elementConfig.options[0]];
                configCopy['model'].value = '';
                configCopy['variant'].value = '';
                value['model'] = '';
                value['variant'] = '';
                form.setState({ formElements: configCopy });
            }
            this.setState({ image: '' });
        } else if ('model' === key) {
            if (value['brand'] && value['model']) {
                const fatchURL = this.props.ext[key].fatchURL + '/' + value['brand'] + '/' + value['model'] + '/variants';
                axiosInstance.get(fatchURL).then(responce => {
                    const data = this.props.ext.dataFormateFunc(responce);
                    this.variantData = responce.data.data;
                    const configCopy = { ...form.state.formElements };
                    configCopy['variant'].elementConfig.options = [configCopy['variant'].elementConfig.options[0], ...data];
                    configCopy['variant'].value = '';
                    value['variant'] = '';
                    form.setState({ formElements: configCopy });
                });
            } else {
                const configCopy = { ...form.state.formElements };
                configCopy['variant'].elementConfig.options = [configCopy['variant'].elementConfig.options[0]];
                configCopy['variant'].value = '';
                value['variant'] = '';
                form.setState({ formElements: configCopy });
            }
            this.setState({ image: '' });

        } else if ('variant' === key) {
            if (value['brand'] && value['model'] && value['variant']) {
                const selectedVariant = this.variantData.filter(item => item.slug === value['variant']);
                this.setState({ image: API_PROXY_ROUTE + '/' + selectedVariant[0].image_path + selectedVariant[0].image_name });
            }
        }
        this.prevValue[key] = value[key];

        const syntacticEventObj = {
            target: {
                value: ''
            }
        };
        syntacticEventObj.target.value = JSON.stringify(value);
        this.props.changed(syntacticEventObj);
    }
    render() {
        return (
            <div className='compare-car-box'>
                {(this.state.image && this.state.image.trim() !== '') ?
                    <img src={this.state.image} alt="" className="selected-modal-img" /> :
                    <div className="add-option">
                        <span className="plus-symbol">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                        <span className="add-car-txt">Add Car</span>
                    </div>}
                <FormElementGenerator
                    // key={Date.now()}
                    ref={this.formRef}
                    formConfig={this.props.elementConfig}
                    filter={true}
                    submitFunc={this.changeHandler}
                    hideFormTag={true}
                />
            </div>
        );
    }

    compareObj = (one, two) => {
        let misMatchedKey = '';
        Object.keys(one).every(key => {
            if (one[key] !== two[key]) {
                misMatchedKey = key;
                return false;
            }
            return true;
        });
        return misMatchedKey;
    }

}
export default CompareBox;

