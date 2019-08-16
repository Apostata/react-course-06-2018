import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredientsState, setIngredientsState] = useState([]);
  const [filteredState, setFilteredState] = useState([]);

  useEffect(()=>{
    fetch('https://react-hooks-update-d4774.firebaseio.com/ingredients.json')
    .then( 
      response => response.json()
    )
    .then( json => {
      const ingredientsArray = [];

      for( const key in json){
        ingredientsArray.push({
          id: key,
          title: json[key].title,
          amount: json[key].amount
        })
      }
      setIngredientsState(ingredientsArray);
      setFilteredState(ingredientsArray);
    })
  }, []);

  useEffect(()=>{
    console.log('INGREDIENT STATE', ingredientsState)
  }, [ingredientsState]);

  const addIngredient = ingredient => {
    fetch('https://react-hooks-update-d4774.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( 
      response => response.json()
      .then( json=>
          setIngredientsState( prevIngredients => [
            ...prevIngredients,
            { id: json.name, ...ingredient }
          ]
        )
      )
    )   
  };

  const removeItem = id => {
    setIngredientsState( 
      prevIngredients => prevIngredients.filter(igredient => igredient.id !== id)
    )
  }

  const filteringList = (valor) =>{
    setFilteredState(() =>{
        const filtered = ingredientsState.filter(igredient => igredient.title.indexOf(valor) > -1);
        console.log(filtered);
        return filtered;
      }
    )
  };

  return (
    <div className="App">
      <IngredientForm  onAddIngredient={addIngredient} />

      <section>
        <Search applyFilter={filteringList}/>
        <IngredientList ingredients={filteredState}  onRemoveItem={removeItem}/>
      </section>
    </div>
  );
}

export default Ingredients;
