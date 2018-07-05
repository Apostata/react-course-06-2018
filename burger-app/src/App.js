import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>{/*compoenente de certa forma desnecessário*/}
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
