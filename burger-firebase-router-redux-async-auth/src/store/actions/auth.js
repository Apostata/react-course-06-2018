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
                dispatch(asyncCheckAuthTimeout(response.data.expiresIn))
            })
            .catch(error=>{
                console.log(error);
                dispatch(authError(error.response.data.error));
            });
    }
};

export const asyncCheckAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            //Loagar quanto o tempo de expiração do token acabar (1h)
            dispatch(logout());
        }, expirationTime * 1000)
    }
};

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

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