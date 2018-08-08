import React, {Component} from 'react';
//import axios from '../../axios-create-user';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.scss';
//import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Auth extends Component {
    state ={
        controls:{
            email: {
                elementType:'input',
                attributes:{
                    type:'email',
                    placeholder: 'Seu Email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType:'input',
                attributes:{
                    type:'password',
                    placeholder: 'Sua senha'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    submitedHandler(e){
        e.preventDefault();

        this.props.asyncAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    }

    switchAuthModeHandler(){
        this.setState(prevState=>{
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    inputChangeHandler(e, inputId){
        
        const clonedForm = {
            ...this.state.controls,

            [inputId]:{
                ...this.state.controls[inputId],
                value: e.target.value,
                valid: this.checkValidaty(
                    e.target.value,
                    this.state.controls[inputId].validation
                ),
                touched: true
            }           
        };

        this.setState({
            controls: clonedForm,
        });
        
    }

    checkValidaty(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.isEmail){
            const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = regex.test(value) && isValid
        }
        
        if(rules.isNumeric){
            if (rules.isNumeric) {
                const regex = /^\d+$/;
                isValid = regex.test(value) && isValid
            }
        }

        return isValid;
    }

    render(){
        const formElements = [];

        for(let key in this.state.controls){
            formElements.push({
                id:key,
                config:this.state.controls[key]
            })
        };

        const outputElements = formElements.map(element=>{
            return(  
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    attributes={element.config.attributes}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    change={(ev)=>{this.inputChangeHandler(ev, element.id)}}
                />
            );
        });


        return (
            <div className={styles.Auth}>
                <form onSubmit={(event) => this.submitedHandler(event)}>
                    {outputElements}
                    <Button classe="Success">SUBMIT</Button>
                </form>
                <Button classe="Danger" clicked={this.switchAuthModeHandler.bind(this)}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>    
        );

    }
};

// const mapStoreStateToProps = state =>{
//     return{
//         loading: state.login.loading,
//         isValid: state.login.isValid
//     }
// };

const mapStoreDispatchToProps = dispatch =>{
    return{
        asyncAuth: (email, password, isSignup) => dispatch(actions.asyncAuth(email, password, isSignup)) 
    }
}

// export default withErrorHandler(
//     connect(null, mapStoreDispatchToProps)(Login),
//     axios
// );
export default connect(null, mapStoreDispatchToProps)(Auth)