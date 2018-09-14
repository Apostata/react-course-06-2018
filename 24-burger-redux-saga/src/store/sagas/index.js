import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionsTypes';

import {logoutSaga, checkAuthTimeoutSaga, authSaga, checkAuthStateSaga} from './auth';
import {initIgredientsSaga} from './burgerBuilder';
import {asyncOrderSaga} from './order';
//import { asyncAuth } from '../actions';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT_CREDENTIALS, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.GET_INGREDIENTS, initIgredientsSaga);
}

export function* watchOrder(){
    yield takeEvery(actionTypes.GET_ORDERS, asyncOrderSaga);
}