import React, { Component} from 'react';
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';
export  default class ErorrBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) =>{
        this.setState({
            hasError: true,
            errorMessage: error
        });
    }

    render(){
        if(this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>
        }
        else{
            return this.props.children;
        }
        
    }
}