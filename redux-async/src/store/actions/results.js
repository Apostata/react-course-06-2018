import * as actionTypes from './actionTypes';

export const storeResult = result =>{
    return {
        type: actionTypes.STORE_RESULT,
        result: result
    };
}

export const asyncStoreResult = result =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(storeResult(result));
        }, 2000);
    }
};

export const deleteResult = id =>{
    return {
        type: actionTypes.DELETE_RESULT,
        id: id
    }
};
