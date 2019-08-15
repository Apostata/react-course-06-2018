import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredientsState, setIngredientsState] = useState([]);

  useEffect(()=>{
    fetch('https://react-hooks-update-d4774.firebaseio.com/ingredients.json')
    .then( 
      response => response.json()
    )
    .then( json => {
      console.log(json)
      const ingredientsArray = [];

      for( const key in json){
        ingredientsArray.push({
          id: key,
          title: json[key].title,
          amount: json[key].amount
        })
      }
      setIngredientsState(ingredientsArray);
    })
  }, []);

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

  return (
    <div className="App">
      <IngredientForm  onAddIngredient={addIngredient} />

      <section>
        <Search />
        <IngredientList ingredients={ingredientsState}  onRemoveItem={removeItem}/>
      </section>
    </div>
  );
}

export default Ingredients;
