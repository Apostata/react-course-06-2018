# React-Redux 

## useSelector
Usado para substituir a constante passada para o método do react-redux connect mapStateToProps().
Exemplo:
````
...
import { useSelector } from 'react-redux';
...
const burgerBuilder = props => {
    const ingredients = useSelector( state => state.burger.ingredients);
    const error = useSelector( state => state.burger.ingredients);
    const totalPrice = useSelector( state => state.burger.totalPrice);
    const isAuthenticated = useSelector( state => state.auth.token !== null);
    ...  
}

export default burgerBuilder;

````

## useDispatch
Usado para substituir a constante passada para o método do react-redux connect mapDispatchToProps().
Exemplo:
````
...
import { useDispatch, useSelector } from 'react-redux';
...
const burgerBuilder = props => {
    const dispatch = useDispatch();
    
    const ingredients = useSelector( state => state.burger.ingredients);
    const error = useSelector( state => state.burger.ingredients);
    const totalPrice = useSelector( state => state.burger.totalPrice);
    const isAuthenticated = useSelector( state => state.auth.token !== null);

    const onAddIngredient = ingredientName => dispatch(actions.addIngredient(ingredientName));
    const onRemoveIngredient = ingredientName => dispatch(actions.removeIngredient(ingredientName));
    ...  
}

export default burgerBuilder;
