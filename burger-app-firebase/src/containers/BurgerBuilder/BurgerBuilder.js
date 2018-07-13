import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import INGREDIENT_PRICES from '../../json/ingredient_prices.json';
import axios from '../../axios-orders';

class BurgerBuilder extends Component{

    state = {
        ingredients:null,
        totalPrice: 10,
        purchasable: false,
        purchasing:false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response =>{
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error =>{

            });
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
        
            this.setState({
                purchasable: sum > 0
            })
    }

    addIngredientHandler(type){
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const addedPrice = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newPrice = oldTotalPrice + addedPrice;

        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchaceState(updatedIngredients);
    }

    removeIngredientHandler(type){
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const deducedPrice = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newPrice = oldTotalPrice - deducedPrice;

        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchaceState(updatedIngredients);
    }

    purchaseHandler(){
        this.setState({purchasing:!this.state.purchasing});
    }

    purchaseContinueHandler(){
       this.setState({loading:true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rene Souza',
                address: {
                    street:'Rua das ruas',
                    zipCode: '1234451',
                    country: 'Brasil'
                },
                email: 'renre@teste.com.br'
            },
            deliveryMethod: 'espresso'
        };

        axios.post('/orders.json', order)  //.json por conta do firebase
            .then(response =>{
                console.log(response);
                this.setState({loading:false, purchasing:false});
            })
            .catch(error => {
                console.log(error)
                this.setState({loading:false, purchasing:false});
            });
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };

        let orderSummary = null;
        let burger = this.state.error ? <p>Os ingredientes não puderam ser carregados!</p> : <Spinner />;

        for(let idx in disableInfo){
            disableInfo[idx] = disableInfo[idx] <= 0
        }

       
        if(this.state.ingredients){
            burger = 
                <Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                            addIngredient={this.addIngredientHandler.bind(this)}
                            removeIngredient={this.removeIngredientHandler.bind(this)}
                            disabled={disableInfo}
                            totalPrice ={this.state.totalPrice}
                            purchasable = {this.state.purchasable}
                            orded={this.purchaseHandler.bind(this)}
                    />
                </Fragment>
            ;
            orderSummary = 
                <OrderSummary
                    ingredients={this.state.ingredients}
                    cancelClick={this.purchaseHandler.bind(this)}
                    continueClick={this.purchaseContinueHandler.bind(this)}
                    totalPrice ={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);