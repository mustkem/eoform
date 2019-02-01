export default {
    name: {
        classes: '',
        labels: {
            id: 'name',
            label: true,
            labelText: 'Name'
        },
        elementType: 'input',
        elementConfig: {
            options: [
                { value: '' },
            ]
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: true
    },
    mobile: {
        classes: '',
        labels: {
            id: 'mobile',
            label: true,
            labelText: 'Mobile Number'
        },
        elementType: 'input',
        elementConfig: {
            options: [
                { value: '' },
            ]
        },
        value: '',
        validation: {
            required: true,
            isNumeric:true,
            minLength:10,
            maxLength:13
        },
        valid: false,
        touched: true
    },
    email: {
        classes: '',
        labels: {
            id: 'email',
            label: true,
            labelText: 'Email Id'
        },
        elementType: 'input',
        elementConfig: {
            options: [
                { value: '' },
            ]
        },
        value: '',
        validation: {
            required: true,
            isEmail:true
        },
        valid: false,
        touched: true
    },
    check: {
        classes: '',
        labels: {
            id: 'check',
            label: true,
            labelText: 'I am agree with T&C'
        },
        elementType: 'onOff',
        elementConfig: {
            options: [
                { value: '' },
            ]
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: true
    },
    state: {
        classes: '',
        labels: {
            id: 'state',
            label: false,
            labelText: 'Select State'
        },
        elementType: 'normalSelect',
        elementConfig: {
            options: [
                { value: '', label: 'Select State' },
            ]
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: true
    },

    city: {
        classes: '',
        labels: {
            id: 'city',
            label: false,
            labelText: 'Select city'
        },
        elementType: 'normalSelect',
        elementConfig: {
            options: [
                { value: '', label: 'Select City' }
            ]
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: true
    }
}