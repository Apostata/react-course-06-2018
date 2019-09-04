//burger builder actions
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';
//burgerbuilder sagas
export const GET_INGREDIENTS = 'GET_INGREDIENTS';

//order actions
export const PURCHASE_START = 'PURCHASE_START';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE_ERROR = 'PURCHASE_ERROR';
export const PURCHASE_SUBMITED = 'PURCHASE_SUBMITED';
export const PURCHASE_ENDED = 'PURCHASE_ENDED';
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';
//order saga
export const PURCHASE_ORDERS = 'PURCHASE_ORDERS';
export const FETCH_ORDERS = 'FETCH_ORDERS';

//login actions
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS'; 
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
//auth sagas
export const AUTH_INIT_CREDENTIALS = 'AUTH_INIT_CREDENTIALS';
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';