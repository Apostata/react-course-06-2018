import * as actionTypes from './actionsTypes';

export const asyncAuth = (email, password, isSignup) =>{
    return{
        type: actionTypes.AUTH_INIT_CREDENTIALS,
        email:email,
        password:password,
        isSignup:isSignup
    }
};

export const checkAuthTimeout = (expirationTime) =>{
    return {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime:expirationTime
    }
};

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSuccess = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authSuccess = (token, userId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authError = (error) =>{
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
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}