import * as actionTypes from '../actions/actionsTypes';

export const asyncOrder = (order, token)=>{
    return{
        type:actionTypes.PURCHASE_ORDERS,
        order:order,
        token:token
    }
};


export const asyncFetchOrders = (token, userId)=>{
    return{
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    };
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