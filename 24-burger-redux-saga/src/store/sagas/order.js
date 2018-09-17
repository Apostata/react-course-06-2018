import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import * as actions from '../actions';

export function* asyncOrderSaga(action){
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

export function* asyncFetchOrdersSaga(action){
    
    yield put(actions.fetchOrdersStart());
    const queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

    try{
        const response =  yield axios.get(`/orders.json${queryParams}`);
        const fetchedOrders = Object.keys(response.data)
        .reduce((acum, key)=>{
            return acum.concat({
                ...response.data[key],
                id:key
            });
        },[]);
        
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    }

    catch(error){
        yield put(actions.fetchOrdersError(error));
    };

};
