import React, { useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredient, action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;

    case 'ADD':
      return [...currentIngredient, action.ingredient];
      
    case 'REMOVE':
      return currentIngredient.filter(ingredient => ingredient.id !== action.id);

    default :
      throw new Error('Should not get there!');
  }
};

const uiReducer = (currentUiState, action) => { // para mostar o loader e o modal de erros
  switch(action.type){
    case 'SEND':
      return { error: null, loading: true };
    case 'RESPONSE':
    case 'CLEAR':
      return { error: null, loading: false };
    case 'ERROR':
      return { error: action.error.message, loading: false };
    default :  
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [ingredientsState, dispatchIngredient ]= useReducer(ingredientReducer, []);
  // const [ingredientsState, setIngredientsState] = useState([]);
  const [uiState, dispatchUi ]= useReducer(uiReducer, { loading: false, error: null });
  // const [isLoadingState, setIsLoadingState] = useState(false);
  // const [errorState, setErrorState] = useState(null);
 
  const addIngredient = ingredient => {
    dispatchUi({type:'SEND'});
    fetch('https://react-hooks-update-d4774.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( 
      response => response.json()
      .then( json=> {
          // setIngredientsState( prevIngredients => [
          //   ...prevIngredients,
          //   { id: json.name, ...ingredient }
          // ]);
          dispatchIngredient({type:'ADD', ingredient:{ id: json.name, ...ingredient }})
          dispatchUi({type:'RESPONSE'});
        }
      )
      .catch(error =>{
        dispatchUi({type:'ERROR', error});
      })
    )   
  };

  const removeItem = id => {
    dispatchUi({type:'SEND'});
    fetch(`https://react-hooks-update-d4774.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
    .then(()=> {
      dispatchUi({type:'RESPONSE'});
      // setIngredientsState( 
      //   prevIngredients => prevIngredients.filter(igredient => igredient.id !== id)
      // );
      dispatchIngredient({type:'REMOVE', id});
    })
    .catch(error =>{
      dispatchUi({type:'ERROR', error});
    })
  };

  const colseModal = () => {
    dispatchUi({type:'CLEAR'});
  };

  const filteringList = useCallback( filteredIngredients => {
    // setIngredientsState( filteredIngredients );
    dispatchIngredient({type: 'SET', ingredients: filteredIngredients});
  }, []);

  return (
    <div className="App">
      { uiState.error && <ErrorModal onClose={colseModal} >{uiState.error}</ErrorModal> }
      <IngredientForm  onAddIngredient={addIngredient} loading={uiState.loading} />
      <section>
        <Search applyFilter={filteringList}/>
        <IngredientList ingredients={ingredientsState}  onRemoveItem={removeItem} />
      </section>
    </div>
  );
}

export default Ingredients;
