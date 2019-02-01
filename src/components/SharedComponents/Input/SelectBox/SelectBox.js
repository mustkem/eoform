import React, { Component } from 'react';


class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoComplete: '',
            show: false,
            down: true,
            value: '',
            showAll: false,
            overflowY: ''
        }
        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.clearStateValue = this.clearStateValue.bind(this);
        this.textBoxKeyPressHandler = this.textBoxKeyPressHandler.bind(this);
        this.wrapperRef = React.createRef();
        this.optionsList = null;
        this.count = -1;
        this.internalTuched = false;
    }

    focusHandler() {
        const Input = this.wrapperRef.current.querySelector('input');
        const inputValueLength = Input.value.length;
        if (inputValueLength) {
            Input.focus();
            Input.setSelectionRange(0, inputValueLength);
            this.setState({ showAll: true });

        }

        if (this.state.show === false) {
            const optionListHeightLimit = 200;
            const viewportOffset = this.wrapperRef.current.getBoundingClientRect();
            const gapTop = viewportOffset.top;
            const gapBottom = window.innerHeight - gapTop - this.wrapperRef.current.offsetHeight;

            const allOptions = this.wrapperRef.current.querySelectorAll('ul li');
            let optionListHeight = 0;
            allOptions.forEach(option => {
                optionListHeight += option.offsetHeight;
            });

            this.setState({
                show: true,
                down: (gapBottom > optionListHeightLimit || gapTop < optionListHeightLimit),
                overflowY: optionListHeight > optionListHeightLimit ? 'overflow-y' : ''
            });
        }
    }

    clearStateValue() {
        this.setState({ value: '' });
    }

    blurHandler() {
        if (this.state.show === true) {
            const Input = this.wrapperRef.current.querySelector('input');
            const inputValueLength = Input.value.length;
            Input.focus();
            Input.setSelectionRange(inputValueLength, inputValueLength);
            this.setState({ show: false });
        }
    }

    buttonClickHandler(value) {
        if (this.state.show === true) {
            const syntacticEventObj = {
                target: {
                    value: ''
                }
            };
            syntacticEventObj.target.value = value;
            this.props.changed(syntacticEventObj, this.clearStateValue);
            const currentValue = this.props.options.filter(item => item.value === value);
            this.setState({ value: currentValue[0].label });
            this.blurHandler();
        }
    }

    changeHandler(e) {
        let value = e.target.value;
        const selectedValue = this.optionsList.filter(item => item.label.toLowerCase() === value.toLowerCase());
        const matchedValue = !selectedValue.length ? null : selectedValue[0].value;
        this.internalTuched = true;
        if (matchedValue) {
            const optionToSet = this.wrapperRef.current.querySelector('li');
            let att = document.createAttribute("data-active");
            att.value = true;
            optionToSet.setAttributeNode(att);
        }
        this.setState({ value: e.target.value, showAll: false, show: true });
        if (!value) {
            const syntacticEventObj = {
                target: {
                    value: ''
                }
            };
            syntacticEventObj.target.value = value;
            this.props.changed(syntacticEventObj, this.clearStateValue);
        }
    }


    handleClickOutside(event) {
        if (this.state.show === true) {
            if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
                this.blurHandler();
            }
        }
    }

    textBoxKeyPressHandler(e) {
        const listOfOptions = this.wrapperRef.current.querySelectorAll('li');
        if (e.keyCode === 9 || e.keyCode === 27) {
            this.setState({ show: false });
        }
        if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
            if (e.keyCode === 40) {
                if (!this.state.show) {
                    this.setState({ show: true });
                }

                if (this.count < listOfOptions.length - 1) {
                    this.count++;
                }

                listOfOptions.forEach((item, index) => {
                    if (index === this.count) {
                        let att = document.createAttribute("data-active");
                        att.value = true;
                        item.setAttributeNode(att);
                    } else {
                        let att = document.createAttribute("data-active");
                        att.value = false;
                        item.setAttributeNode(att);
                    }
                });
            } else {
                if (this.count > 0) {
                    this.count--;
                }
                listOfOptions.forEach((item, index) => {
                    if (index === this.count) {
                        let att = document.createAttribute("data-active");
                        att.value = true;
                        item.setAttributeNode(att);
                    } else {
                        let att = document.createAttribute("data-active");
                        att.value = false;
                        item.setAttributeNode(att);
                    }
                });


            }
        }

        if (e.keyCode === 13) {
            e.preventDefault();
            const optionToSet = this.wrapperRef.current.querySelector('li[data-active="true"] button');
            if (optionToSet) {
                Object.keys(optionToSet).forEach(item => {
                    if (item.includes('reactEventHandlers')) {
                        optionToSet[item].onClick();
                    }
                });
            }
        }
    }
    makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 9; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    componentDidMount() {
        this.setState({ autoComplete: this.makeId() });
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {
        this.optionsList = this.props.options.filter(item => {
            if (this.state.showAll && item.value !== '') {
                return true;
            }
            return item.label.toLowerCase().includes(this.state.value.toLowerCase()) && item.value !== ''
        });

        const displayLabel = this.props.options[0].label;

        const matchedLabel = () => {
            let matchedLabelVal = '';
            if (this.props.value && !this.internalTuched) {
                this.optionsList.forEach(item => {
                    if (item.value === this.props.value) {
                        this.initialSelectedflag = 1;
                        matchedLabelVal = item.label;
                    }

                });
            }
            return matchedLabelVal;
        };

        const inputValue = this.state.value ? this.state.value : matchedLabel();
        return (
            <div ref={this.wrapperRef} className={`syntactic-select-box ${this.state.down ? 'down' : 'up'}`}>
                <input className="form-control"
                    autoComplete="off"
                    name={this.state.autoComplete}
                    readOnly={false}
                    onChange={this.changeHandler}
                    onClick={this.focusHandler}
                    onKeyDown={this.textBoxKeyPressHandler}
                    type="text"
                    id={this.props.id}
                    value={inputValue}
                    placeholder={displayLabel}
                    disabled={!this.optionsList.length && !inputValue}
                />

                <ul className={`${this.state.show ? 'slide-down' : 'slide-up'} ${this.state.overflowY}`}>
                    {this.optionsList.map((option) => (
                        <li data-active={option.label === inputValue && inputValue ? true : false} key={option.value}>
                            <button tabIndex="-1" type="button" onClick={() => this.buttonClickHandler(option.value)}>{option.label}</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default SelectBox;

