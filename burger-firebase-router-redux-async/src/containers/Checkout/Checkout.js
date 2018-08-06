import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';

class Checkout extends Component{

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
                    ingredients={this.props.ingredients}
                    cancel={this.checkoutCancelHandler.bind(this)}
                    continue={this.checkoutContinueHandler.bind(this)}
                />
                <Route 
                    path={`${this.props.match.path}/contact-data`}
                    component={ContactData} 
                />
            </div>
        );
    }
};

const mapStoreStateToProps = state =>{
    return {
        ingredients: state.ingredients
    }
};


export default connect(mapStoreStateToProps)(Checkout);