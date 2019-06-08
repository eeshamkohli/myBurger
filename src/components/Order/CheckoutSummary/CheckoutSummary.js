import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../ui/Button/Button';
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button buttonType="Danger" clicked={props.onCancelClicked}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.onContinueClicked}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary
