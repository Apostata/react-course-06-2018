# React Router

## Passando dados entre páginas 
Para passar os dados que serão usado na proxima página, é necessário que 
seja passado o props do compomente roteador seja passado adiante.

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