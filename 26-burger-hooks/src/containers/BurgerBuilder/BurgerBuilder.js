import React, {useState, useEffect, useCallback, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/index'; //.index pode ser omitido
import { useDispatch, useSelector } from 'react-redux';

const burgerBuilder = props => {
    const [pruchaseState, setPurchaseState] = useState(false);
    
    const dispatch = useDispatch();
    const ingredients = useSelector( state => state.burger.ingredients);
    const error = useSelector( state => state.burger.ingredients);
    const totalPrice = useSelector( state => state.burger.totalPrice);
    const isAuthenticated = useSelector( state => state.auth.token !== null);
    const { history } = props;
    const onAddIngredient = ingredientName => dispatch(actions.addIngredient(ingredientName));
    const onRemoveIngredient = ingredientName => dispatch(actions.removeIngredient(ingredientName));
    
    const asyncIinitIgredients = useCallback(
        () => dispatch(actions.asyncIinitIgredients()), 
        [dispatch]
    );
    
    const onSetAuthRedirectPath =  path => dispatch(actions.setAuthRedirectPath(path))

    useEffect(()=>{
        asyncIinitIgredients();
    },[asyncIinitIgredients]);

    const updatePurchaceState = (updatedIngredients) => {
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

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchaseState(!pruchaseState);
        }
        else{
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }

    const purchaseContinueHandler = () => {
        history.push('/checkout');
    }

    
    const disableInfo = {
        ...ingredients
    };

    let orderSummary = null;
    let burger = error ? <p>Os ingredientes não puderam ser carregados!</p> : <Spinner />;

    for(let idx in disableInfo){
        disableInfo[idx] = disableInfo[idx] <= 0
    }

    
    if(ingredients){
        burger = 
            <Fragment>
                <Burger ingredients={ingredients}/>
                <BuildControls 
                    addIngredient={onAddIngredient}
                    removeIngredient={onRemoveIngredient}
                    disabled={disableInfo}
                    totalPrice ={totalPrice}
                    purchasable = {updatePurchaceState(ingredients)}
                    orded={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Fragment>
        ;
        orderSummary = 
            <OrderSummary
                ingredients={ingredients}
                cancelClick={purchaseHandler}
                continueClick={purchaseContinueHandler}
                totalPrice ={totalPrice}
            />;
    }

    return(
        <Fragment>
            {burger}
            
            <Modal show={pruchaseState} backdropClick={purchaseHandler}>
                {orderSummary}
            </Modal>
        </Fragment>
    );
    
}


export default withErrorHandler(
    burgerBuilder
    , axios
);