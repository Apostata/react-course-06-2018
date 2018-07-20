import React, {Component}  from 'react';

const  asyncComponent = (importComponent) =>{
    return class extends Component{
        state = {
            component: null
        }

        componentDidMount(){
            importComponent()
                .then(cmpt =>{
                    this.setState({component:cmpt.default});
                })
        }

        render(){
            const COMPONENT = this.state.component;

            return COMPONENT ? <COMPONENT {...this.props} /> : null;
        }
    }
}

export default asyncComponent;