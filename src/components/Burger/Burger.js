import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css'
import Aux from '../../hoc/Auxilary'
const Burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_, i) => {
            return <BurgerIngredient type={ingredient} key={ingredient + i} />
        })
    }).reduce((oldArr, NewArr) => {
        return oldArr.concat(NewArr);
    }, []);
    if (ingredients.length === 0)
        ingredients = <div>Please add an ingredient!</div>;


    return (
        <Aux>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {ingredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
        </Aux>
    )
}

export default Burger
