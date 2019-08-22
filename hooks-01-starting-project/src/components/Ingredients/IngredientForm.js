import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [titleState, titleSetState ]=  useState('');
  const [amountState, amountSetState ]=  useState('');
  const {loading} = props;

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({
      title: titleState,
      amount: amountState
    })
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" id="title"
              value={titleState}
              onChange={ event => titleSetState(event.target.value) }
             />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number"
              id="amount"
              value={amountState}
              onChange={ event => amountSetState(event.target.value) }
            />
          </div>
          <div className="ingredient-form__actions" >
            <button type="submit">Add Ingredient</button>
            { loading && <LoadingIndicator/> }
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
