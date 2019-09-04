import React, {Component} from 'react';

//importComponent = ()=>import ('./nomeDocomponent')
//precisa ser uma função para pode usar como uma promise e então 
//usar o .then()

const asyncComponent = (importComponent) =>{
    return class extends Component{
        state ={
            component: null
        }

        componentDidMount(){
            importComponent().then(component =>{
                this.setState({
                    component: component.default
                });
            })
        }

        render(){
            const COMPONENT = this.state.component
            return COMPONENT ? <COMPONENT {...this.props} /> : null

        }
    }
}

export default asyncComponent;

