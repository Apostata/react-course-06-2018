import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const asyncAuth = (email, password, isSignup) =>{
    return dispatch => {//redux thunk
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        const API_KEY = "AIzaSyDOS0kiI8kBhQn8uDfHKtM1XQ6I0oFDIdc";

        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
       
        if(!isSignup){
            url= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
        }

        axios.post(url, authData)
            .then(response=>{
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(error=>{
                console.log(error);
                dispatch(authError(error));
            });
    }
};

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
};

const authSuccess = (token, userId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

const authError = (error) =>{
    return {
        type: actionTypes.AUTH_ERROR,
        error
    }
};