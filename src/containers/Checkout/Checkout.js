import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {


    onCancelClickedHandler = () => {
        this.props.history.goBack();
    }

    onContinueClickedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param of query.entries()) {
        //     if (param[0] === 'price') {
        //         price = param[1];
        //     }
        //     else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }
        // this.setState({ ingredients: ingredients, totalPrice: price })
    }

    render() {
        let summary = <CheckoutSummary ingredients={this.props.ings} onCancelClicked={this.onCancelClickedHandler} onContinueClicked={this.onContinueClickedHandler} />
        return (
            <div>
                {summary}
                <Route path={this.props.match.path + '/contact-data'} 
                // render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />} 
                component = {ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)