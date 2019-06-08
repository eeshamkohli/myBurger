import React, { Component } from 'react'
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/ui/Spinner/Spinner';
import { withRouter } from 'react-router-dom'
import Input from '../../../components/ui/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 5
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                isValid: true,
                validation: {
                },
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        let orderData = {};
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderDetails: orderData
        }
        axios.post('/orders.json', order).then(
            response => { this.setState({ loading: false, orderClicked: false }); this.props.history.push('/'); },
            error => { this.setState({ loading: false, orderClicked: false }); console.log(error) }
        );

    }

    onInputChangeHandler = (event, formIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedIdentifierConfig = { ...updatedOrderForm[formIdentifier] };
        updatedIdentifierConfig.value = event.target.value;
        console.log(updatedIdentifierConfig)
        let isValid = this.checkValidity(updatedIdentifierConfig.value, updatedIdentifierConfig.validation);
        updatedIdentifierConfig.isValid = isValid
        updatedIdentifierConfig.touched = true;
        updatedOrderForm[formIdentifier] = updatedIdentifierConfig;
        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].isValid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    checkValidity = (value, rule) => {
        let isValid = true;

        if (rule.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid
        }

        if (rule.maxLength) {
            isValid = value.length <= rule.maxLength && isValid
        }

        return isValid
    }

    render() {
        const formarray = [];

        for (let key in this.state.orderForm) {
            formarray.push({ id: key, config: this.state.orderForm[key] });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formarray.map(val => {
                    return <Input value={val.config.value} elementType={val.config.elementType} elementConfig={val.config.elementConfig} key={val.id} invalid={!val.config.isValid} shouldValidate={val.config.validation} touched={val.config.touched} changed={(event) => this.onInputChangeHandler(event, val.id)} />
                })}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter your Contact Data</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(withRouter(ContactData))
