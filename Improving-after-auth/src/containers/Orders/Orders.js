import React, {Component} from 'react';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/';
import {connect} from 'react-redux';

class Orders extends Component {
   
    componentDidMount(){
        //console.log(this.props.userId)
        this.props.asyncFetchOrders(this.props.token, this.props.userId);
    }

    render(){
        let orders = <Spinner />;

        if(!this.props.loading){
            orders = this.props.orders.map(order=>(
                <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ));
        }

        return(
            <div>
                {orders}
            </div>
        );
    }
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
        connect(mapSroteStateToProps, mapStoreDispatchToProps)(Orders)
        , axios
    ); 