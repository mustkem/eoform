import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormElementGenerator from './FormElementGenerator';
import {
    Button,
    Form
} from 'reactstrap';

configure({adapter: new Adapter()});

describe('<FormElementGenerator />', () => {

 let wrapper;
    beforeEach(() => {
        wrapper = shallow(<FormElementGenerator />);
    });

    it('should render Form', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('should render Button', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});