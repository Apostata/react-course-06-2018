# React Hooks

Agora é possível usar apenas os componentes stateless (functional), com hooks para gerenciar estados e life cycles ao invés de usar os staless só para componentes de apresentação e os statefull (classes), para gerenciar estados e life cycles.

## useState
O mais importante e usado, para gerenciar statado de um componente.
a funcção useState pode aceitar qualquer variavel, não necessáriamente um objeto.
e retorna sempre um array, o indice 0 é um snapshot do estado, e o segundo é uma função para atualizar o estado. O prevState usado abaixo pode ser qualquer nome, mas é um stado anterior antes da mudança ser realizada, por padrão e boas práticas é legal de usa-lo em apps grandes. 

````
import React, { useState } from 'react';
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [state, setState ]=  useState({
    title: '',
    amount: ''
  });
  
  ...

  const updateState = (event, name) => {
    const newValue = event.target.value;
    setState(
      prevState => ({
        ...prevState,
        [name]: newValue
      })
    );
  };

  return (
    <section className="ingredient-form">
        ...
        <input 
            type="text" id="title"
            value={state.title}
            onChange={ event => updateState(event, 'title') }
        />
        ...
        <input 
            type="number"
            id="amount"
            value={state.amount}
            onChange={ event => updateState(event, 'amount') }
        />
        ...
    </section>
  );
});

export default IngredientForm;

````

### Melhor performance (recomendado)
Para melhor performance, é recomendavel usar um useState para cada estdo:

````
...
    const [titleState, setTitleState ]=  useState('');
    const [amountState, setAmountState ]=  useState('');
...
````
garantindo que só mudará o estado necessário, diferente do modo anterior que todo o o objeto era recriado ao mudar apenas uma propriedade.
