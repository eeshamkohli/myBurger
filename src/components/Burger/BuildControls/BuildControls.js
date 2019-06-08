import React, { Component } from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
class BuildControls extends Component {

  controls = [
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' }
  ];


  render() {
    let controls = this.controls.map(val => <BuildControl label={val.label} key={val.label} addIngredientHandler={() => this.props.addIngredientHandler(val.type)} removeIngredientHandler={() => this.props.removeIngredientHandler(val.type)} disabled={this.props.disabled[val.type]} />)
    return (
      <div className={classes.BuildControls}>
        <p>Current Price: {this.props.price}</p>
        {controls}
        <button className={classes.OrderButton} disabled={!this.props.purchasable} onClick={this.props.orderClicked}>Order Now!</button>
      </div>
    )
  }
}

export default BuildControls
