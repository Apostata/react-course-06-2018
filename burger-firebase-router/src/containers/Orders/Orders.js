import React, {Component} from 'react';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state ={
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(response =>{
            const fetchOrders = Object.keys(response.data)
                .reduce((acum, key)=>{
                    return acum.concat({
                        ...response.data[key],
                        id:key
                    });
                },[]);
            
            this.setState({loading:false, orders:fetchOrders});
        })
        .catch(error =>{
            console.log(error);
            this.setState({loading:true});
        });
    }

    render(){
        let orders = <Spinner />;

        if(!this.state.loading){
            orders = this.state.orders.map(order=>(
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

export default withErrorHandler(Orders, axios); 