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


export const asyncFetchOrders = ()=>{
    return dispatch =>{
        dispatch(fetchOrdersStart());

        axios.get('/orders.json')
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