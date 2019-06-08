import React from 'react'
import Aux from '../../../hoc/Auxilary'
import Button from '../../ui/Button/Button';
const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
        return <li key={ingredient} style={{ textTransform: 'capitalize' }}>{ingredient} : {props.ingredients[ingredient]}</li>
    });

    return (
        <Aux>
            <h3>Your order summary:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: {props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelPressed} buttonType='Danger'>Cancel</Button>
            <Button clicked={props.continuePressed} buttonType='Success'>Continue</Button>
        </Aux >
    )
}

export default OrderSummary
