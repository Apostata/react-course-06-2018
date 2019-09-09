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
Quanto que se o array é preenchido, significa que o componente só irá renderizar novamente, quando o(s) estado(s) no array mudarem.
**NOTA: array vazio funciona como componentDidMount**

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
Quando usa o hook useEffect, é necessário passar as dependências usadas nele, como um método ou propriedade. Guarda a função passada na memória, impedindo que quando o componente pai é rerrenderizado, ele crie uma nova instancia do método, assim criando uma unica vez o método.

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
Com o useCallback, guarda a função passada na memória, impedindo que quando o componente pai é rerrenderizado, ele crie uma nova instancia do método, assim criando uma unica vez o método.

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
Para usar com contextApi para centralizar mudanças da estado
Criar um componente para ser o provedor do contexto:

````
import React, {useState} from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () =>{}
});

const AuthContextProvider = props => {
    const [authState, setAuthState] = useState(false);
    
    const loginHandler = () => {
        setAuthState(true)
    };

    return (
        <AuthContext.Provider value={{ login: loginHandler, isAuth: authState }} >
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
````

então no componente onde será usado o contexto, ai sim será armazenado o componente com o contexto na função useContext() e usado para validar.

````
import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import {AuthContext} from './Context/auth-context'

const App = props => {
  const authContext = useContext(AuthContext);
  let content = authContext.isAuth? <Ingredients /> : <Auth />; 

  return content;
};

export default App;

````

e no componente de login(neste caso), será usado o useContext() para chamar a função que irá alterar o estado do login:

````
import React, {useContext} from 'react';

import Card from './UI/Card';
import './Auth.css';

import {AuthContext} from '../Context/auth-context';

const Auth = props => {
  const authContext = useContext(AuthContext);
  
  const loginHandler = () => {
    authContext.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;

````

## useMemo
Para melhora de performance. Guarda na memória, uma função, componente ou um side-effect, impedindo que quando o componente pai é rerrenderizado, ele crie uma nova instancia, economizando performance.

no exemplo abaixo, irá economizar a performance para renderizar a lista de ingredientes, apenas quando mudar o estado dos ingredientes ou da função removeItem

````
import React, { useCallback, useReducer, useMemo } from 'react';
...

const ingredientReducer = (currentIngredient, action) => {
  ...
};

const uiReducer = (currentUiState, action) => { // para mostar o loader e o modal de erros
  ...
};

const Ingredients = () => {
  ...

  const ingredientList = useMemo(() =>{
    return <IngredientList ingredients={ingredientsState}  onRemoveItem={removeItem} />
  }, [ingredientsState, removeItem])

  return (
    <div className="App">
      { uiState.error && <ErrorModal onClose={colseModal} >{uiState.error}</ErrorModal> }
      <IngredientForm  onAddIngredient={addIngredient} loading={uiState.loading} />
      <section>
        <Search applyFilter={filteringList}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;

````

## Criando um hook customizado

É possivel criar seu proprio hook customizado:
exemplo https.js
````
import { useReducer, useCallback } from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
}

const httpReducer = (currentUiState, action) => { // para mostar o loader e o modal de erros
    switch(action.type){
        case 'SEND':
            return { error: null, loading: true, data: null };
        case 'RESPONSE':
            return { error: null, loading: false, data: action.responseData, extra: action.extra, identifier: action.identifier };
        case 'CLEAR':
            return initialState;
        case 'ERROR':
            return { ...currentUiState, error: action.error.message };
        default :  
            throw new Error('Should not get there!');
    }
};

const useHttp = () => {
    const [httpState, dispatchHttp ]= useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({type:'CLEAR'}), []);

    const sendRequest = useCallback((url, method, body, extra, identifier) =>{
        dispatchHttp({type:'SEND', identifier});
        fetch(url, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseData)=> {
            dispatchHttp({type:'RESPONSE', responseData, extra, identifier});
        })
        .catch(error =>{
            dispatchHttp({type:'ERROR', error, identifier});
        })
    },[]);

    return {
        loading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        extra: httpState.extra,
        identifier: httpState.identifier,
        sendRequest,
        clear
    }
};

export default useHttp;
````

no exemplo ingredients.js usando o hook criado anteriormente:

````
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
````