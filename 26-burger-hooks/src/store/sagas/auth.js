import axios from 'axios';
import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
//import * as actionTypes from '../actions/actionsTypes';
import * as actions from '../actions'
import API_KEY from '../apiKey';

export function* logoutSaga(){ //transform a função em um generator
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "tokenEpirationDate");
    yield call([localStorage, "removeItem"], "userId");

    //usar o call é mais fácil para testar

    // localStorage.removeItem('token');
    // localStorage.removeItem('tokenEpirationDate');
    // localStorage.removeItem('userId'); 

    yield put(actions.logoutSuccess())
};


export function* checkAuthTimeoutSaga(action){
    yield delay((action.expirationTime * 1000));
    yield put(actions.logout());
};

export function* authSaga(action){
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
        
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    
    if(!action.isSignup){
        url= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    }

    try{
        const response = yield axios.post(url, authData);
        const tokenExpirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000)); //data Atual + 1 hora   
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('tokenEpirationDate', tokenExpirationDate);
        localStorage.setItem('userId', response.data.localId);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
        
    } catch(error){
        yield console.log(error);
        yield put(actions.authError(error.response.data.error));
    }
};

export function* checkAuthStateSaga(){
    const token = localStorage.getItem('token');

        if(!token) {
            yield put(actions.logout());
        }
        else{
            const tokenExpirationDate = new Date(localStorage.getItem('tokenEpirationDate'));
            
            if(tokenExpirationDate  <= new Date()){
                yield put(actions.logout());
            }
            else{
                const userId = localStorage.getItem('userId');
                yield put(actions.authSuccess(token, userId));
                yield put(actions.checkAuthTimeout((tokenExpirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
}

