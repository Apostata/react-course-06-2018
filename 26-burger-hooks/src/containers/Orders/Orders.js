import React, { useEffect } from 'react';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/';
import {connect} from 'react-redux';

const orders = props => {
   const {token, userId, asyncFetchOrders}  = props;

   useEffect(()=>{
    asyncFetchOrders(token, userId);
   }, [token, userId, asyncFetchOrders]);
        


    let ordersRender = <Spinner />;

    if(!props.loading){
        ordersRender = props.orders.map(order=>(
            <Order 
                key={order.id} 
                ingredients={order.ingredients}
                price={+order.price}
            />
        ));
    }

    return(
        <div>
            {ordersRender}
        </div>
    );
    
}

const mapSroteStateToProps = state => {
    return{
        orders: state.order.orders,
        loading:state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapStoreDispatchToProps = dispatch =>{
    return{
        asyncFetchOrders: (token, userId) => dispatch(actions.asyncFetchOrders(token, userId))
    }
};

export default withErrorHandler(
    connect(mapSroteStateToProps, mapStoreDispatchToProps)(orders)
    , axios
); 