import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export class FilterBoxWidthSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            filterValue: ''
        }
    }
    toggleHandler = () => {
        this.setState({ show: !this.state.show });
    }
    cheaged = (e) => {
        const current = e.target.parentNode.parentNode;
        const values = [];
        current.querySelectorAll(`input[type="checkbox"]`).forEach(item => {
            if (item.checked === true) {
                values.push(item.value);
            }
        });
        const value = values.join(',');
        const syntacticEventObj = {
            target: {
                value: ''
            }
        };
        syntacticEventObj.target.value = value;
        this.props.changed(syntacticEventObj);
    }
    filterData = (e) => {
        this.setState({ filterValue: e.target.value });
    }
    render() { 
        return (
            <div className={"filter-box-wrap filter-box-with-search" + this.props.classes}>
                <div className="label-warp">

                    <div className="label-head">
                        <button onClick={this.toggleHandler} type="button">
                            {this.props.label ? <h4>{this.props.labelText}</h4> : null}
                            {this.state.show ? <i className="fa fa-minus" aria-hidden="true"></i> : <i className="fa fa-plus" aria-hidden="true"></i>}
                        </button>
                    </div>

                    <FormGroup className={this.state.show ? 'slideDown' : 'slideUp'}>
                        <div className="widget-search-box">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <Input
                                autoComplete="off"
                                type="text"
                                onChange={this.filterData}
                                value={this.state.filterValue}
                                placeholder={this.props.elementConfig.placeHolder}
                            />
                        </div>
                        {this.props.elementConfig.options.map(item => (

                            <Label className={(!this.state.filterValue || item.label.toLowerCase().includes(this.state.filterValue.toLowerCase())) ? '' : 'd-none'} key={item.value}>
                                <Input type="checkbox"
                                    onChange={this.cheaged}
                                    checked={this.props.value.split(',').includes(item.value)}
                                    value={item.value}
                                    name={this.props.name} /> {item.label}
                                <i className="custom-check"></i>
                            </Label>
                        ))}

                    </FormGroup>
                </div>
            </div>
        );
    }
}
