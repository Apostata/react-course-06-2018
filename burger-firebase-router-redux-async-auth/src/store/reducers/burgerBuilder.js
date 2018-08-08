import * as actionTypes from '../actions/actionsTypes';
import INGREDIENT_PRICES from '../../json/ingredient_prices.json';
import updatedObject from '../utility';

const initialState ={
    ingredients: null,
    totalPrice: 10,
    error: false
};

const addIngredient = (state, action)=>{
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState);
};

const removeIngredient = (state, action)=>{
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState);
};

const setIngredients =(state, action)=>{
    return updatedObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: initialState.totalPrice
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        
        case actionTypes.SET_INGREDIENTS:
           return setIngredients(state, action);
            
        case actionTypes.INGREDIENTS_ERROR:
            return updatedObject(state, {error:true});

        default:
            return state;
    }
};

export default reducer;