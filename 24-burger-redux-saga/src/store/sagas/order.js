import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import * as actions from '../actions';

export function* asyncOrderSaga(action){
    //order, token
        yield put(actions.purchaseBurgerStart());
        try{
            const response = yield axios.post(`/orders.json?auth=${action.token}`, action.order)  //.json por conta do firebase
            yield put(actions.purchaseSubmited());
            yield put(actions.purchaseSuccess(response.data.name, action.order));                
        }
        catch(error){
            yield put(actions.purchaseError(error));
        };
};