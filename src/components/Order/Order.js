import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {

    let ingredients = [];
    for (let ing in props.ingredients) {
        ingredients.push({ name: ing, amount: props.ingredients[ing] });
    }



    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients.map(val=><span className={classes.Span}>{val.name} : ({val.amount})</span>)}</p>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
