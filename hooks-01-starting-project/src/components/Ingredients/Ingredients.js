import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredient, action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;

    case 'ADD':
      return [...currentIngredient, action.ingredient];
      
    case 'REMOVE':
      const newArray = currentIngredient.filter(ingredient => ingredient.id !== action.id);
      return newArray;

    default :
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [ingredientsState, dispatchIngredient ]= useReducer(ingredientReducer, []);
  const { loading, error, data, extra, identifier, sendRequest, clear } = useHttp();

  useEffect(() => {
    if(!loading && !error && identifier === 'REMOVE_INGREDIENT'){
      dispatchIngredient({type:'REMOVE', id: extra});
    }
    else if(!loading && !error && data && identifier === 'ADD_INGREDIENT'){
      dispatchIngredient({type:'ADD', id: data.name, ingredient:{...extra, id: data.name }});
    }
  }, [data, extra, identifier, loading, error])
  
  const addIngredient = useCallback(ingredient => {
    sendRequest(
      `https://react-hooks-update-d4774.firebaseio.com/ingredients.json`,
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    )
  }, [sendRequest]);

  const removeItem = useCallback( id => {
    sendRequest(
      `https://react-hooks-update-d4774.firebaseio.com/ingredients/${id}.json`,
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT'
    )
  },[sendRequest]);

  const filteringList = useCallback( filteredIngredients => {
    dispatchIngredient({type: 'SET', ingredients: filteredIngredients});
  }, []);

  const ingredientList = useMemo(() =>{
    return <IngredientList ingredients={ingredientsState}  onRemoveItem={removeItem} />
  }, [ingredientsState, removeItem])

  return (
    <div className="App">
      { error && <ErrorModal onClose={clear} >{error}</ErrorModal> }
      <IngredientForm  onAddIngredient={addIngredient} loading={loading} />
      <section>
        <Search applyFilter={filteringList}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
