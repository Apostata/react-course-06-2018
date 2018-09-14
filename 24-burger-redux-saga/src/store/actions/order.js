import * as actionTypes from '../actions/actionsTypes';
import axios from '../../axios-orders';

export const asyncOrder = (order, token)=>{
    return{
        type:actionTypes.GET_ORDERS,
        order:order,
        token:token
    }
};


export const asyncFetchOrders = (token, userId)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(`/orders.json${queryParams}`)
        .then(response =>{
            const fetchedOrders = Object.keys(response.data)
                .reduce((acum, key)=>{
                    return acum.concat({
                        ...response.data[key],
                        id:key
                    });
                },[]);
            
                dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error =>{
            dispatch(fetchOrdersError(error));
        });
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersError = error => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
        error
    }
};

export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_START
    }
};

export const purchaseSuccess = (id, order) =>{
    return{
        type: actionTypes.PURCHASE_SUCCESS,
        id,
        order
    }
};

export const purchaseError = error =>{
    return{
        type: actionTypes.PURCHASE_ERROR,
        error
    }
};

export const purchaseSubmited = () =>{
    return{
        type: actionTypes.PURCHASE_SUBMITED
    }
};

export const purchaseEnded = () =>{
    return{
        type: actionTypes.PURCHASE_ENDED
    }
};