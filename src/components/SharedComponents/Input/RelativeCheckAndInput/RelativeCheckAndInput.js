import React, { Component } from 'react';


class RelativeCheckAndInput extends Component {

    constructor() {
        super()
        this.state = {
            show: false
        }
    }

    toggle =(e) => {
        this.setState({ show: e.target.checked }, () => {
            const syntacticEventObj = {
                target: {
                    value: ''
                }
            };
            if (!this.state.show) {
                syntacticEventObj.target.value = '';
            }
            this.props.changed(syntacticEventObj);
        });

    }


    changHandler = (e) => {

        const syntacticEventObj = {
            target: {
                value: ''
            }
        };

        syntacticEventObj.target.value = e.target.value;

        if (!this.state.show) {
            syntacticEventObj.target.value = '';
        }


        this.props.changed(syntacticEventObj);
    }


    render() {
        return (
            <div>
                <div className="">
                {this.props.label && <label>
                <input type="checkbox" onChange={this.toggle} name="checkbox" />{this.props.labelText}</label>}
                    {this.state.show && <input
                        onChange={this.changHandler}
                        value={this.props.value}
                        type="text"
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                    />}
                </div>


            </div>
        )
    }

}

export default RelativeCheckAndInput;