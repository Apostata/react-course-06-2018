import React, {Component} from 'react';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/';
import {connect} from 'react-redux';

class Orders extends Component {
   
    componentDidMount(){
        this.props.asyncFetchOrders();
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
        loading:state.order.loading
    }
};

const mapStoreDispatchToProps = dispatch =>{
    return{
        asyncFetchOrders: () => dispatch(actions.asyncFetchOrders())
    }
};

export default withErrorHandler(
        connect(mapSroteStateToProps, mapStoreDispatchToProps)(Orders)
        , axios
    ); 