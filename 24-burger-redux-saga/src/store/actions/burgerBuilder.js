import * as actionTypes from '../actions/actionsTypes';

export const addIngredient = (name)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients)=>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
};

export const ingredientsError = ()=>{
    return{
        type: actionTypes.INGREDIENTS_ERROR
    }
};

export const asyncIinitIgredients = () =>{
    return{
        type: actionTypes.GET_INGREDIENTS
    };
    // return dispatch =>{ 
    //     axios.get('/ingredients.json')
    //         .then(response =>{
    //             dispatch(setIngredients(response.data)); //async dispatch
    //         })
    //         .catch(error =>{
    //             dispatch(ingredientsError())
    //         });
    // }
};