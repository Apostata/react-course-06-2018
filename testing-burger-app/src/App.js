import React, { Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


const asyncCheckout = asyncComponent(()=>import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(()=>import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(()=>import('./containers/Auth/Auth'));
const asyncLogout = asyncComponent(()=>import('./containers/Auth/Logout/Logout'));


class App extends Component {

  componentDidMount(){
    this.props.checkAuthState();
  }

  render() {
    let routes =(
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/auth" component={asyncAuth} /> {/*--- É necessário manter essa rota para que após logado ele redirecione para checkout ---*/}
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    
    //console.log(routes)
    return (
        <div>
          <Layout>
              {routes}
          </Layout>
        </div>
    );
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
