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
                const tokenExpirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000)); //data Atual + 1 hora   
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('tokenEpirationDate', tokenExpirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error=>{
                console.log(error);
                dispatch(authError(error.response.data.error));
            });
    }
};

export const checkAuthTimeout = (expirationTime) =>{
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
    localStorage.removeItem('token');
    localStorage.removeItem('tokenEpirationDate');
    localStorage.removeItem('userId');

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

export const setAuthRedirectPath = path =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const checkAuthState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');

        if(!token) {
            dispatch(logout());
        }
        else{
            const tokenExpirationDate = new Date(localStorage.getItem('tokenEpirationDate'));
            
            if(tokenExpirationDate  <= new Date()){
                dispatch(logout());
            }
            else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((tokenExpirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}