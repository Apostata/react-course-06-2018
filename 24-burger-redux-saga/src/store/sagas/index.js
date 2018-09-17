import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionsTypes';

import {logoutSaga, checkAuthTimeoutSaga, authSaga, checkAuthStateSaga} from './auth';
import {initIgredientsSaga} from './burgerBuilder';
import {asyncOrderSaga, asyncFetchOrdersSaga} from './order';
//import { asyncAuth } from '../actions';

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INIT_CREDENTIALS, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga)
    ]);

    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_INIT_CREDENTIALS, authSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.GET_INGREDIENTS, initIgredientsSaga);
}

export function* watchOrder(){
    //take takeLatest => pega a ultima ocorrencia mesmo que seja disparados diversas vezes,
    //pega epenas a ultima
    yield takeLatest(actionTypes.PURCHASE_ORDERS, asyncOrderSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, asyncFetchOrdersSaga);
}