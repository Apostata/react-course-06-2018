export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD_QTD = 'ADD_QTD';
export const SUBTRACT_QTD = 'SUBTRACT_QTD';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () =>{
    return {
        type: INCREMENT
    }
};

export const decrement = () =>{
    return {
        type: DECREMENT
    }
};


export const addQtd = qtd =>{
    return {
        type: ADD_QTD,
        amount: qtd
    }
};

export const subtractQtd = qtd =>{
    return {
        type: SUBTRACT_QTD,
        amount: qtd
    }
};

export const storeResult = result =>{
    return {
        type: STORE_RESULT,
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
        type: DELETE_RESULT,
        id: id
    }
};
