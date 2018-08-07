import * as actionTypes from '../actions/actionsTypes';
import INGREDIENT_PRICES from '../../json/ingredient_prices.json';
import updatedObject from '../utility';

const initialState ={
    ingredients: null,
    totalPrice: 10,
    error: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updatedObject(state, updatedState);
        
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngs = updatedObject(state.ingredients, updatedIng)
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updatedObject(state, updatedSt);
        
        case actionTypes.SET_INGREDIENTS:
           
            return updatedObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: initialState.totalPrice
            });

        case actionTypes.INGREDIENTS_ERROR:
            return updatedObject(state, {error:true});

        default:
            return state;
    }
};

export default reducer;