import React, { Component, Fragment } from 'react';
import { path } from 'ramda';

import FormElementGenerator from '../../FormElementGeneratorV2/FormElementGeneratorV2';

class MultiBoxInput extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.formWrapperRef = React.createRef();
        this.state = {
            elementConfig: this.props.elementConfig,
        }
    }
    componentDidMount() {
        this.formWrapperRef.current.formRef = this.formRef.current;
    }
    changeHandler = (value) => {
        const syntacticEventObj = {
            target: {
                value: ''
            }
        };
        syntacticEventObj.target.value = JSON.stringify(value);
        this.props.changed(syntacticEventObj);
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.value) {
            state.elementConfig = { ...props.elementConfig };
        }
        return state;
    }
    render() {
        const BeforeComponent = this.props.ext.beforeComponent ? this.props.ext.beforeComponent : Fragment;
        const AfterComponent = this.props.ext.afterComponent ? this.props.ext.afterComponent : Fragment;

        const Element = (<div data-label={this.props.labelText} data-multiboxinput={true} ref={this.formWrapperRef}>
            <div className="sell-car-tab-wrap">
                <BeforeComponent />

                <div className='multi-box-input'>
                    <FormElementGenerator
                        ref={this.formRef}
                        formConfig={{ ...this.state.elementConfig }}
                        filter={true}
                        submitFunc={this.changeHandler}
                        hideFormTag={true}
                        value={!!this.props.value}
                        changeFunc={path(['props', 'ext', 'changeFunc'], this) ? path(['props', 'ext', 'changeFunc'], this) : () => { }}
                    />
                </div>
                <AfterComponent />
            </div>
        </div>);
        const Wrapper = this.props.ext.parentComponent;
        if (Wrapper) {
            return <Wrapper {...this.props}>{Element}</Wrapper>
        }
        return Element;
    }
}
export default MultiBoxInput;

