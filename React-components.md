# React Components

# React.memo (functional component):

## Memorizando componente

O componente só será rerenderizado QUANDO o props passado pelo componente pai para este componente mudar. Caso o componente pai mude um status o qual não é passado para este componente, ele NÃO será re-renderizado.

````
const IngredientForm = React.memo(props => {
  
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          ...
        </form>
      </Card>
    </section>
  );
});
````

**NOTA: pode ser utilizado na hora de exportar o arquivo**
Exemplo acima poderia ser alterado para:
````
export default  React.memo(IngredientForm);
````

### Colocando condição para a mudança do Memo
É possivel customizar a condição para a alteração do componente quando usando o memo().
No exemplo abaixo colocaremos uma condição para re-renderizar o componente quanto alterar as props e estas serem diferentes de "show" ou "children"

````
export default memo(modal, (prevProps, nextProps)=>{
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});
````

# React.lazy (async functional components)
Para renderização asíncrona dos componentes, melhorando performance, trazendo components sob Demanda. como no RequireJs.

````
import React, { useEffect, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
...

// import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


const Checkout = React.lazy(()=>import('./containers/Checkout/Checkout'));
const Orders = React.lazy(()=>import('./containers/Orders/Orders'));
const Auth = React.lazy(()=>import('./containers/Auth/Auth'));
const Logout = React.lazy(()=>import('./containers/Auth/Logout/Logout'));


const app = props => {
  useEffect(() =>{
    props.checkAuthState();
  },[]);

  let routes =(
    <Switch>
      <Route path="/auth" render={(props)=><Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" render={(props)=><Checkout {...props} />} />
        <Route path="/orders" render={(props)=><Orders {...props} />} />
        <Route path="/logout"  component={Logout} />
        <Route path="/auth"  render={(props)=><Auth/>} {...props} /> {/*--- É necessário manter essa rota para que após logado ele redirecione para checkout ---*/}
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  
  return (
      <div>
        <Layout>
            <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </div>
  );
}

...

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));

````
