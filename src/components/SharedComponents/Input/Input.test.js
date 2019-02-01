import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FormGroup, Label, Input } from 'reactstrap';

import InputField from './Input';

configure({ adapter: new Adapter() });

describe('<Input />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<InputField />);
    });

    it('should render one <Input /> elements', () => {
        wrapper.setProps({ elementType: 'input' });
        expect(wrapper.find(Input)).toHaveLength(1);
    });

    it('should render one <FormGroup /> elements', () => {
        wrapper.setProps({ elementType: 'input' });
        expect(wrapper.find(FormGroup)).toHaveLength(1);

    });

    it('should render zero <Label /> elements', () => {
        wrapper.setProps({ elementType: 'input' });
        expect(wrapper.find(Label)).toHaveLength(0);
    });

    it('should render one <Label /> elements', () => {
        wrapper.setProps({ elementType: 'input', label: true });
        expect(wrapper.find(Label)).toHaveLength(1);
    });


    it('should render "null"', () => {
        wrapper.setProps({});
        expect(wrapper.find(Label)).toHaveLength(0);
    });
});