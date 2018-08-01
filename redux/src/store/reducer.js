const initialState = {
    counter: 0,
    results:[]
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            };

        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            };

        case 'ADD_QTD':
            return {
                ...state,
                counter: state.counter + action.amount
            };

        case 'SUBTRACT_QTD':
            return {
                ...state,
                counter: state.counter - action.amount
            };

        case 'STORE_RESULT':
            return {
                ...state,
                results: state.results.concat({id:new Date(), value:state.counter})
            };

        case 'DELETE_RESULT':
            return {
                ...state,
                results: state.results.filter(item => item.id !== action.id)
            };
        
        default:
            return state;
    }
}

export default reducer;