import React, { useEffect, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

// import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


const Checkout = React.lazy(()=>import('./containers/Checkout/Checkout'));
const Orders = React.lazy(()=>import('./containers/Orders/Orders'));
const Auth = React.lazy(()=>import('./containers/Auth/Auth'));
const Logout = React.lazy(()=>import('./containers/Auth/Logout/Logout'));


const app = props => {
  const { checkAuthState } = props;
  
  useEffect(() =>{
    checkAuthState();
  },[checkAuthState]);

  let routes =(
    <Switch>
      <Route path="/auth" render={(props)=> <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" render={(props)=> <Checkout {...props} />} />
        <Route path="/orders" render={(props)=> <Orders {...props} />} />
        <Route path="/logout"  render={(props)=> <Logout {...props} />} />
        <Route path="/auth"  render={(props)=> <Auth {...props} />} /> {/*--- É necessário manter essa rota para que após logado ele redirecione para checkout ---*/}
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

const mapStateToProps = state =>{
  return{
      isAuthenticated: state.auth.token !== null 
  }
};

const mapDispatchToProps = dispatch =>{
  return{
    checkAuthState: () => dispatch(actions.checkAuthState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
