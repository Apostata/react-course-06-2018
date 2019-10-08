import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';

const checkout = props => {

    const checkoutCancelHandler = () =>{
       props.history.goBack();
    }

    const checkoutContinueHandler =() => {
       props.history.replace(`${props.match.path}/contact-data`);
    }

    let summary = <Redirect to="/" />;

    if(props.ingredients){
        summary = (
            <div>
                <CheckoutSummary 
                    ingredients={props.ingredients}
                    cancel={checkoutCancelHandler}
                    continue={checkoutContinueHandler}
                />
                <Route 
                    path={`${props.match.path}/contact-data`}
                    component={ContactData} 
                />
            </div>
        );
    }

    return summary;
    
};

const mapStoreStateToProps = state =>{
    return {
        ingredients: state.burger.ingredients
    }
};


export default connect(mapStoreStateToProps)(checkout);