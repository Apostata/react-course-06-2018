import * as actionsTypes from '../actions/actionsTypes';
import updatedObject from '../utility';
const initialState ={
    orders:[],
    loading: false,
    submited: false,
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionsTypes.PURCHASE_START:
        return updatedObject (state, {loading:true});

        case actionsTypes.PURCHASE_SUCCESS:
            const newOrder = updatedObject(action.order, { id: action.id});
               
            return updatedObject (state, {loading:false, orders: state.orders.concat(newOrder)});
    
        case actionsTypes.PURCHASE_ERROR:
            return updatedObject (state, {loading:false});
        
        case actionsTypes.PURCHASE_SUBMITED:
            return updatedObject (state, {submited:true});

        case actionsTypes.PURCHASE_ENDED:
            return updatedObject (state, {submited:false});

        case actionsTypes.FETCH_ORDERS_START:
            return updatedObject (state, {loading:true});

        case actionsTypes.FETCH_ORDERS_SUCCESS:
        return updatedObject (state, {loading: false, orders: action.orders});
            
        case actionsTypes.FETCH_ORDERS_ERROR:
            return updatedObject (state, {loading:false});

        default:
            return state;
    }
};

export default reducer;