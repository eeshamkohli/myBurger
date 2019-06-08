import * as actiontypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actiontypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actiontypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actiontypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = (errorMessage) => {
    return {
        type: actiontypes.FETCH_INGREDIENTS_FAILED,
        errorMessage
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        })
            .catch(error => {
                dispatch(fetchIngredientsFailed(error.message))
            });
    }
}