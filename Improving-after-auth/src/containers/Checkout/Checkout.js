import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

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
        console.log(this.props.ingredients)
        let summary = <Redirect to="/" />;

        if(this.props.ingredients){
            summary = (
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

        return summary;
    }
};

const mapStoreStateToProps = state =>{
    return {
        ingredients: state.burger.ingredients
    }
};


export default connect(mapStoreStateToProps)(Checkout);