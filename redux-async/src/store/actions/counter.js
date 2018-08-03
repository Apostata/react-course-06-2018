import * as actionTypes from './actionTypes';

export const increment = () =>{
    return {
        type: actionTypes.INCREMENT
    }
};

export const decrement = () =>{
    return {
        type: actionTypes.DECREMENT
    }
};


export const addQtd = qtd =>{
    return {
        type: actionTypes.ADD_QTD,
        amount: qtd
    }
};

export const subtractQtd = qtd =>{
    return {
        type: actionTypes.SUBTRACT_QTD,
        amount: qtd
    }
};
