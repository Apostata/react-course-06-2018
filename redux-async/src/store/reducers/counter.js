import * as actionTypes from '../actions/actionTypes';

const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            };

        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };

        case actionTypes.ADD_QTD:
            return {
                ...state,
                counter: state.counter + action.amount
            };

        case actionTypes.SUBTRACT_QTD:
            return {
                ...state,
                counter: state.counter - action.amount
            };
        
        default:
            return state;
    }
}

export default reducer;