/*
 * This input element is not completed yet,
 * We have to test in actual API integration.
 * 
 */

import React, { Component } from 'react';
import axios from 'axios';
import FormElementGenerator from '../../FormElementGenerator/FormElementGenerator';
import { API_PROXY_ROUTE } from '../../../../../config';


const axiosInstance = axios.create({
    baseURL: API_PROXY_ROUTE
});

class RelativeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementConfig: this.props.elementConfig,
        }

        this.changeHandler = this.changeHandler.bind(this);

    }

    changeHandler(value) {
        let prevValue = null;
        let flag = true;
        let completed = true;
        // let compKey = '';
        Object.keys(value).forEach(key => {
            if (flag) {
                if (!value[key]) {
                    completed = false;
                    const fatchURL = this.props.ext[key].fatchURL + '?' + this.props.ext[key].fatchKey + '=' + prevValue;
                    axiosInstance.get(fatchURL).then(responce => {
                        const data = this.props.ext.dataFormateFunc(responce);
                        const configCopy = this.state.elementConfig;
                        configCopy[key].elementConfig.options = [configCopy[key].elementConfig.options[0], ...data];
                        this.setState({ elementConfig: configCopy });
                    });
                    flag = false;
                }
                prevValue = value[key];
            }
        });

        if (completed) {
            /*
            let initLoop = false;
            Object.keys(value).forEach(key => {
                if (initLoop) {
                    compKey += '@' + value[key];
                } else {
                    compKey = value[key];
                    initLoop = true;
                }

            });

            const fatchURL = this.props.ext.fatchProductURL + '?' + this.props.ext.prodectKey + '=' + compKey;
            axiosInstance.get(fatchURL).then(responce => {
                const data = this.props.ext.setIdFunc(responce);
                console.log(responce);
                const syntacticEventObj = {
                    target: {
                        value: ''
                    }
                };
                syntacticEventObj.target.value = data.id;
                this.props.changed(syntacticEventObj);
            });*/
            const syntacticEventObj = {
                target: {
                    value: ''
                }
            };

            syntacticEventObj.target.value = JSON.stringify(value);
            this.props.changed(syntacticEventObj);
        }
    }



    render() {
        return (
            <div className='relative-select-box'>
                <FormElementGenerator
                    formConfig={{ ...this.state.elementConfig }}
                    filter={true}
                    submitFunc={this.changeHandler}
                    hideFormTag={true}
                />
            </div>
        );
    }
}
export default RelativeSelect;



/*export const carSelectFormConfig = {
    selectCar: {
        elementConfig: {
            State: {
                classes: '',
                labels: {
                    id: 'State',
                    label: false,
                    labelText: 'Select Brand'
                },
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '', label: 'Select Brand' },
                        { value: 'Audi', label: 'Audi' },
                        { value: 'BMW', label: 'BMW' },
                        { value: 'Tyota', label: 'Tyota' },
                        { value: 'Hyundai', label: 'Hyundai' },
                        { value: 'Volvo', label: 'Volvo' },
                        { value: 'Ferrari', label: 'Ferrari' },
                        { value: 'Jaguar', label: 'Jaguar' },
                        { value: 'Tata', label: 'Tata' },
                    ]
                },
                value: '',
                validation: false,
                valid: true,
                touched: false
            },
            City: {
                classes: '',
                labels: {
                    id: 'City',
                    label: false,
                    labelText: 'Select Brand'
                },
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '', label: 'Select Brand' },

                    ]
                },
                value: '',
                validation: false,
                valid: true,
                touched: false
            },
            Brands: {
                classes: '',
                labels: {
                    id: 'Brands1',
                    label: false,
                    labelText: 'Select Brand'
                },
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '', label: 'Select Brand' },

                    ]
                },
                value: '',
                validation: false,
                valid: true,
                touched: false
            },
            Model: {
                classes: '',
                labels: {
                    id: 'Model1',
                    label: false,
                    labelText: 'Select Model'
                },
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '', label: 'Select Model' },
                    ]
                },
                value: '',
                validation: false,
                valid: true,
                touched: false
            },
            Version: {
                classes: '',
                labels: {
                    id: 'Version1',
                    label: false,
                    labelText: 'Select Variant'
                },
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '', label: 'Select Variant' },
                    ]
                },

                value: '',
                validation: false,
                valid: true,
                touched: false
            },
        },
        ext: {
            City: {
                fatchURL: 'static/dummy-model.json',
                fatchKey: 'state',
            },
            Brands: {
                fatchURL: 'static/dummy-model.json',
                fatchKey: 'city',
            },
            Model: {
                fatchURL: 'static/dummy-model.json',
                fatchKey: 'brand',
            },
            Version: {
                fatchURL: 'static/dummy-version.json',
                fatchKey: 'model',
            },
            // fatchProductURL: 'static/dummy-product.json',
            // prodectKey: 'brandModelVer',

            dataFormateFunc: fatchDataCallback,
            setIdFunc: setIdFunc
        },
        classes: '',
        labels: {
            id: 'Compare1',
            label: false,
            labelText: 'Select Car'
        },
        elementType: 'relativeSelect',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    }
}*/