import React, { useState, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredient, action) =>{
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
}

const Ingredients = () => {
  const [ingredientsState, dispatchIngredient ]= useReducer(ingredientReducer, []);
  // const [ingredientsState, setIngredientsState] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [errorState, setErrorState] = useState(null);
 
  const addIngredient = ingredient => {
    setIsLoadingState(true);
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
          setIsLoadingState(false);
        }
      )
      .catch(error =>{
        setErrorState(error.message);
      })
    )   
  };

  const removeItem = id => {
    setIsLoadingState(true);
    fetch(`https://react-hooks-update-d4774.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
    .then(()=> {
      setIsLoadingState(false);
      // setIngredientsState( 
      //   prevIngredients => prevIngredients.filter(igredient => igredient.id !== id)
      // );
      dispatchIngredient({type:'REMOVE', id});
    })
    .catch(error =>{
      setErrorState(error.message);
    })
  };

  const colseModal = () => {
    setErrorState(null);
    setIsLoadingState(false);
  };

  const filteringList = useCallback( filteredIngredients => {
    // setIngredientsState( filteredIngredients );
    dispatchIngredient({type: 'SET', ingredients: filteredIngredients});
  }, []);

  return (
    <div className="App">
      { errorState && <ErrorModal onClose={colseModal} >{errorState}</ErrorModal> }
      <IngredientForm  onAddIngredient={addIngredient} loading={isLoadingState} />
      <section>
        <Search applyFilter={filteringList}/>
        <IngredientList ingredients={ingredientsState}  onRemoveItem={removeItem} />
      </section>
    </div>
  );
}

export default Ingredients;
