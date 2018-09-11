import * as actionTypes from '../actions/actionsTypes';
import axios from '../../axios-orders';

export const asyncOrder = (order, token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());

        axios.post(`/orders.json?auth=${token}`, order)  //.json por conta do firebase
            .then(response =>{
                dispatch(purchaseSubmited());
                dispatch(purchaseSuccess(response.data.name, order));                
            })
            .catch(error => {
                dispatch(purchaseError(error));
            });
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

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
};

const fetchOrdersError = error => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
        error
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

const purchaseError = error =>{
    return{
        type: actionTypes.PURCHASE_ERROR,
        error
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