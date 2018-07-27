import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component{

    state ={
        ingredients:null,
        totalPrice:0
    }

    componentWillMount(){ //before render
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice;

        for(let param of query){
            if(param[0] !== 'price'){
                ingredients[param[0]] = Number(param[1]);
            }
            else{
                totalPrice = param[1];
            }
        }
        this.setState({ingredients, totalPrice})
    }

    checkoutCancelHandler(){
        this.props.history.goBack();
    }

    checkoutContinueHandler(){
        this.props.history.replace(`${this.props.match.path}/contact-data`);
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancel={this.checkoutCancelHandler.bind(this)}
                    continue={this.checkoutContinueHandler.bind(this)}
                />
                <Route 
                    path={`${this.props.match.path}/contact-data`}
                    render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} 
                />
            </div>
        );
    }
};

export default Checkout;