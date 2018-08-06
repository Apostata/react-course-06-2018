import * as actionTypes from '../actions/actionsTypes';
import axios from '../../axios-orders';

export const asyncOrder = (order)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', order)  //.json por conta do firebase
            .then(response =>{
                dispatch(purchaseSubmited());
                dispatch(purchaseSuccess(response.data.name, order));                
            })
            .catch(error => {
                dispatch(purchaseError(error));
            });
    }
};

const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_START
    }
};

const purchaseSuccess = (id, order) =>{
    return{
        type: actionTypes.PURCHASE_SUCCESS,
        id,
        order
    }
};

const purchaseError = () =>{
    return{
        type: actionTypes.PURCHASE_ERROR
    }
};

const purchaseSubmited = () =>{
    return{
        type: actionTypes.PURCHASE_SUBMITED
    }
};

export const purchaseEnded = () =>{
    return{
        type: actionTypes.PURCHASE_ENDED
    }
};