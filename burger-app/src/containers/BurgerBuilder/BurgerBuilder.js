import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import INGREDIENT_PRICES from '../../json/ingredient_prices.json';

class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 10
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
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };

        for(let idx in disableInfo){
            disableInfo[idx] = disableInfo[idx] <= 0
        }

        return(
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler.bind(this)}
                    removeIngredient={this.removeIngredientHandler.bind(this)}
                    disabled={disableInfo}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;