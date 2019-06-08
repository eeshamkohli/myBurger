import React, { Component } from 'react'
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../components/ui/Backdrop/Backdrop';
import Spinner from '../../components/ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes'
import * as burgerBuilderActions from '../../store/actions/'
import axios from '../../axios-orders'


export class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        orderClicked: false
    }


    // addIngredientHandler = (ingredient) => {
    //     const oldCount = this.state.ingredients[ingredient];
    //     const newIngr = { ...this.state.ingredients };
    //     newIngr[ingredient] = oldCount + 1;
    //     this.setState({ ingredients: newIngr, totalPrice: this.state.totalPrice + PRICE_LIST[ingredient] });
    //     this.updatePurchasable(newIngr);
    // }

    // removeIngredientHandler = (ingredient) => {
    //     const oldCount = this.state.ingredients[ingredient];
    //     const newIngr = { ...this.state.ingredients };
    //     newIngr[ingredient] = oldCount - 1;
    //     this.setState({ ingredients: newIngr, totalPrice: this.state.totalPrice - PRICE_LIST[ingredient] });
    //     this.updatePurchasable(newIngr);
    // }

    updatePurchasable = (newIngredients) => {
        let isPurchasable = Object.keys(newIngredients).map(ingredient => newIngredients[ingredient]).reduce((sum, el) => {
            return sum += el;
        }, 0) > 0 ? true : false;

        return isPurchasable
    }

    continuePurchaseHandler = () => {
        // let queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        // }
        // queryParams.push('price=' + this.props.price)
        // let query = queryParams.join('&')
        // console.log(queryParams)
        this.props.history.push('/checkout');
        //     {
        //     pathname: '/checkout',
        //     search: '?' + query
        // }
        // )
    }

    componentDidMount() {
        this.props.initIngredients();
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({ ingredients: response.data });
        // }).catch(error => { this.setState({ error: true }) });
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? 'Burger cannot be loaded' : <Spinner />;
        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls addIngredientHandler={this.props.onIngredientAdded} removeIngredientHandler={this.props.onIngredientRemoved} price={this.props.price.toFixed(2)} disabled={disabledInfo} purchasable={this.updatePurchasable(this.props.ings)} orderClicked={() => { this.setState({ orderClicked: true }) }} />
            </Aux>);
            orderSummary = <OrderSummary ingredients={this.props.ings} price={this.props.price} cancelPressed={() => this.setState({ orderClicked: false })} continuePressed={this.continuePurchaseHandler} />
        }
        return (
            <Aux>
                <Modal show={this.state.orderClicked} ModalClosed={() => this.setState({ orderClicked: false })}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
