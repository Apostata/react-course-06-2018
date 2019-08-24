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


### Regras para usdo dos hooks
* Usar hooks apenas em componentes funcionais ou em hooks customizados
* Usar apenas na raiz do componente ou outro hook

## useEffect

Um hook que aciona uma função, passada como parametro, que é acionada APÓS a PRIMEIRA renderização do componente e toda vez que tiver uma atualização de estado, useeffect será executado, após a renderização do DOM.
Quando é passado um array vazio, qualquer atualização do state faz com que o componente será renderizado mais uma vez, enquanto que se o array é preenchido, significa que o componente só irá renderizar novamente, quando o(s) estado(s) no array mudarem.

````
 useEffect(()=>{
    fetch('{url}')
    .then( 
      response => response.json()
    )
    .then( json => {
      ...
      }
      setIngredientsState(ingredientsArray);
    })
  }, [ingredients]);
````

### Retorno do useEffect
useEffect pode retornar uma função. caso não tenha nenhuma dependencia, [] (array vazio), está função será rodada quando o componente desmontar, caso contrário roda antes da próxima atualização do useEffect.

````
useEffect(()=>{
    const timer = setTimeout(() => {
      if (filterState === inputRef.current.value){
        const query = filterState.length === 0? "" : `?orderBy="title"&equalTo="${filterState}"`;
        fetch(`${url}${query}`)
        .then( json => {
          ...
        })
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [filterState, applyFilter, inputRef]);

````
Neste caso assim que atualiza o campo, ele cancela o ultimo timer e inicia outro para otimizar a memmória. Quando ficar 500 millisegundos sem digitar, então é feita a requisição na api.
caso não tivesse dependencias no array, a função de retorno iria rodar apenas no unmount do componente.

## useCallback
Quando usa o hook useEffect, é necessário passar as dependências usadas nele, como um método ou propriedade. Com o useCallback, guarda a função passada na memória, impedindo que quando o componente pai é rerrenderizado, ele crie uma nova instancia do método, assim rodando uma unica vez o método.

Componente pai:
````
const Ingredients = () => {
  ...
  const filteringList = useCallback( filteredIngredients => {
    setIngredientsState( filteredIngredients );
  }, []);
  ...

  return (
    <div className="App">
      <IngredientForm  onAddIngredient={addIngredient} />

      <section>
        <Search applyFilter={filteringList}/>
        <IngredientList ingredients={ingredientsState}  onRemoveItem={removeItem}/>
      </section>
    </div>
  );
}
````

Componente filho:
````
useEffect(()=>{
    fetch({url})
    .then( 
      ...
      applyFilter(ingredientsArray);
    })
  }, [filterState, applyFilter]);
````

**NOTA: neste caso, **


## useReducer
Cria uma função muito similar aos reducers do Redux para gerenciar ações nos estados(states) de estados mais complexos (com multiplas actions).
useReducer, recebe 2 parametros, o primeiro é a função do reducer e o segundo o estado inicial.
quando usado com array destructuring, recebe o estado, e o dispatch para acionar as actions do reducer.

exemplo da função reducer fora do componente:

````
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
````

chamando no componente:

````
const Ingredients = () => {
  const [ingredientsState, dispatchIngredient]= useReducer(ingredientReducer, []);

  const addIngredient = ingredient => {
    setIsLoadingState(true);
    fetch(`${url}`)
    .then( 
      response => response.json()
      .then( json=> {
          ...
          dispatchIngredient({type:'ADD', ingredient:{ id: json.name, ...ingredient }});
          ...
        }
      )
    )   
  };

};
````

## useContext
Para usar com contextApi