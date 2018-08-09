import * as actionTypes from './actionsTypes';
import axios from 'axios';
import API_KEY from '../apiKey';

export const asyncAuth = (email, password, isSignup) =>{
    return dispatch => {//redux thunk
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
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
                dispatch(authError(error.response.data.error));
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