import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import SelectBox from './SelectBox/SelectBox';
// import SelectBoxV2 from './SelectBoxV2/SelectBoxV2'
import NormalSelect from './NormalSelect/NormalSelect';
import { FilterBox } from './FilterBox/FilterBox';
import { FilterBoxWidthSearch } from './FilterBoxWithSearch/FilterBoxWithSearch';
import { RadioFilterBoxWidthSearch } from './RadioFilterBoxWithSearch/RadioFilterBoxWithSearch';
import RangeSlider from './RangeSlider/RangeSlider';
// import RelativeSelect from './RelativeSelect/RelativeSelect';
import MultiBoxInput from './MultiBoxInput/MultiBoxInput';
import RangeSliderSingle from './RangeSliderSingle/RangeSliderSingle';
import Radio from './Radio/Radio';
import MissingItemSelect from './MissingItemSelect/MissingItemSelect';
import RelativeCheckAndInput from './RelativeCheckAndInput/RelativeCheckAndInput';
import OnOff from './OnOff/OnOff';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('is-invalid');
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = (<FormGroup className={props.classes}>
                {/* Label */}
                {props.label ? <Label htmlFor={props.id}>{props.labelText}{props.requiredStar ? <sup>*</sup> : ''}</Label> : null}

                {/*show message if any*/}
                {props.messageRequired ? <sup><i className="fa fa-star" aria-hidden="true"></i></sup> : null}

                {/* form input box */}
                <Input id={props.id} className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            </FormGroup>)
            break;

        case ('filterbox'):
            inputElement = <FilterBox {...props} />
            break;

        case ('filterboxWithSearch'):
            inputElement = <FilterBoxWidthSearch {...props} />
            break;

        case ('radioFilterboxWithSearch'):
            inputElement = <RadioFilterBoxWidthSearch {...props} />
            break;
        case ('select'):

            inputElement = (
                <FormGroup className={[props.classes, 'select-box'].join(' ')}>
                    {props.label ? <Label htmlFor={props.id}>{props.labelText}{props.requiredStar ? <sup>*</sup> : ''}</Label> : null}
                    <SelectBox
                        id={props.id}
                        classes={`${inputClasses.join(' ')} form-control`}
                        value={props.value}
                        changed={props.changed}
                        options={props.elementConfig.options}
                        touched={props.touched}
                    />
                </FormGroup>
            );
            break;
        // case ('selectv2'):

        //     inputElement = (
        //         <FormGroup className={[props.classes, 'select-box'].join(' ')}>
        //             {props.label ? <Label htmlFor={props.id}>{props.labelText}</Label> : null}
        //             <SelectBoxV2
        //                 id={props.id}
        //                 classes={`${inputClasses.join(' ')} form-control`}
        //                 value={props.value}
        //                 changed={props.changed}
        //                 options={props.elementConfig.options}
        //                 touched={props.touched}
        //             />
        //         </FormGroup>
        //     );
        //     break;

        case ('normalSelect'):

            inputElement = (
                <FormGroup className={props.classes}>
                    {props.label ? <Label htmlFor={props.id}>{props.labelText}{props.requiredStar ? <sup>*</sup> : ''}</Label> : null}
                    <NormalSelect
                        id={props.id}
                        classes={`${inputClasses.join(' ')} form-control`}
                        value={props.value}
                        changed={props.changed}
                        options={props.elementConfig.options}
                        touched={props.touched}
                    />
                    {/* <Input
                        id={props.id}
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onBlur={props.changed}
                        onChange={props.changed}
                        type="select"
                    >
                        {props.elementConfig && props.elementConfig.options && props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Input> */}
                </FormGroup>
            );
            break;

        case ('missingItemSelect'):

            inputElement = (
                <FormGroup className={[props.classes, 'select-box'].join(' ')}>
                    {props.label ? <Label htmlFor={props.id}>{props.labelText}{props.requiredStar ? <sup>*</sup> : ''}</Label> : null}
                    <MissingItemSelect
                        id={props.id}
                        classes={`${inputClasses.join(' ')} form-control`}
                        value={props.value}
                        changed={props.changed}
                        checkBoxLabel={props.elementConfig.checkBoxLabel}
                        textBoxPlaceHolder={props.elementConfig.textBoxPlaceHolder}
                        options={props.elementConfig.options}
                        touched={props.touched}
                    />
                </FormGroup>
            );
            break;



        case ('rangeSlider'):
            inputElement = <RangeSlider {...props} />;
            break;
        case ('rangeSliderSingle'):
            inputElement = <RangeSliderSingle {...props} />;
            break;

        case ('multiBoxInput'):
            inputElement = <FormGroup className={props.classes}><MultiBoxInput
                elementConfig={props.elementConfig}
                changed={props.changed}
                ext={props.ext}
                label={props.label}
                labelText={props.labelText}
            /></FormGroup>
            break;


        case ('radio'):
            inputElement = <Radio {...props} />
            break;

        case ('onOff'):
            inputElement = <OnOff {...props} />
            break;

        case ('relativeCheckAndInput'):
            inputElement = <FormGroup className={props.classes}>
                <RelativeCheckAndInput
                    id={props.id}
                    classes={inputClasses.join(' ')}
                    label={props.label}
                    labelText={props.labelText}
                    {...props.elementConfig}
                    value={props.value}
                    changed={props.changed}
                />
            </FormGroup>
            break;

        default:
            inputElement = null;
    }

    return inputElement;

};

export default input;