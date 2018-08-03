import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux'

class BurgerBuilder extends Component{

    state = {
        purchasing:false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then(response =>{
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error =>{

        //     });
    }

    updatePurchaceState(updatedIngredients){
        const ingredients = {
            ...updatedIngredients
        }

        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, ingredient)=>{
                return sum + ingredient;
            },0);
        
        return sum > 0
    }

    purchaseHandler(){
        this.setState({purchasing:!this.state.purchasing});
    }

    purchaseContinueHandler(){
        this.props.history.push('/checkout');
    }

    render(){
        const disableInfo = {
            ...this.props.ingredients
        };

        let orderSummary = null;
        let burger = this.state.error ? <p>Os ingredientes não puderam ser carregados!</p> : <Spinner />;

        for(let idx in disableInfo){
            disableInfo[idx] = disableInfo[idx] <= 0
        }

       
        if(this.props.ingredients){
            burger = 
                <Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                            addIngredient={this.props.onAddIngredient}
                            removeIngredient={this.props.onRemoveIngredient}
                            disabled={disableInfo}
                            totalPrice ={this.props.totalPrice}
                            purchasable = {this.updatePurchaceState(this.props.ingredients)}
                            orded={this.purchaseHandler.bind(this)}
                    />
                </Fragment>
            ;
            orderSummary = 
                <OrderSummary
                    ingredients={this.props.ingredients}
                    cancelClick={this.purchaseHandler.bind(this)}
                    continueClick={this.purchaseContinueHandler.bind(this)}
                    totalPrice ={this.props.totalPrice}
                />;
        }

        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Fragment>
                {burger}
                
                <Modal show={this.state.purchasing} backdropClick={this.purchaseHandler.bind(this)}>
                    {orderSummary}
                </Modal>
            </Fragment>
        );
    }
}

const mapStoreStateToProps = state =>{
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapStoreDispatchToProps = dispatch =>{
    return{
        onAddIngredient: (ingredientName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName}),
        onRemoveIngredient: (ingredientName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName})
    }
};


export default withErrorHandler(
    connect(mapStoreStateToProps, mapStoreDispatchToProps)(BurgerBuilder)
    , axios
);