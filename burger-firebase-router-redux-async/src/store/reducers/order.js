import * as actionsTypes from '../actions/actionsTypes';

const initialState ={
    orders:[],
    loading: false,
    submited: false,
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionsTypes.PURCHASE_START:
            return{
                ...state,
                loading: true
            };

        case actionsTypes.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.order,
                id: action.id,
            };
            
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)               
            };

        case actionsTypes.PURCHASE_ERROR:
            return{
                ...state,
                loading: false
            };
        
        case actionsTypes.PURCHASE_SUBMITED:
            return{
                ...state,
                submited: true
            };

        case actionsTypes.PURCHASE_ENDED:
            return{
                ...state,
                submited: false
            };

        default:
            return state;
    }
};

export default reducer;