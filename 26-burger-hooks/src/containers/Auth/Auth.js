import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.scss';
import Spinner from '../../components/UI/Spinner/Spinner';

import {updatedObject, checkValidaty} from '../../utils/utility';

import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const auth = props => {
    const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props;

    const [controlsState, setControlsState] = useState(
        {
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
        }
    );

    const [isSignupState, setIsSignupState] = useState(true);
   
    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== "/"){
            onSetAuthRedirectPath('/');
        }
    },[onSetAuthRedirectPath, buildingBurger, authRedirectPath]);

    const submitedHandler = (e) =>{
        e.preventDefault();

        props.asyncAuth(
            controlsState.email.value,
            controlsState.password.value,
            isSignupState
        );
    };

    const switchAuthModeHandler = () => {
        setIsSignupState(!isSignupState);
    };

    const inputChangeHandler = (e, inputId) => {
        
        const clonedForm = updatedObject(controlsState, {
            [inputId]: updatedObject(controlsState[inputId],{
                value: e.target.value,
                valid: checkValidaty(
                    e.target.value,
                    controlsState[inputId].validation
                ),
                touched: true
            })     
        });
        
        setControlsState(clonedForm)        
    };

    const formElements = [];

    for(let key in controlsState){
        formElements.push({
            id:key,
            config:controlsState[key]
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
                change={(ev)=>{inputChangeHandler(ev, element.id)}}
            />
        );
    });

    let form = <Spinner />;
    
    if(!props.loading){
        form = 
        <form onSubmit={(event) => submitedHandler(event)}>
            {outputElements}
            <Button classe="Success">SUBMIT</Button>
        </form>
        
    }

    let errorMessage = null;

    if(props.error){
        errorMessage = <p className={styles.ErrorMessage}>{props.error.message}</p>
    }
    
    let isAuthenticated = (
        <div className={styles.Auth}>
            {form}
            <Button classe="Danger" clicked={switchAuthModeHandler}>SWITCH TO {isSignupState ? 'SIGNIN' : 'SIGNUP'}</Button>
            {errorMessage}
        </div>
    );

    if (props.isAuth){
        isAuthenticated = <Redirect to={props.authRedirectPath} />;
    }

    return isAuthenticated;
};

const mapStoreStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null, 
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapStoreDispatchToProps = dispatch =>{
    return{
        asyncAuth: (email, password, isSignup) => dispatch(actions.asyncAuth(email, password, isSignup)), 
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    }
}; 

export default connect(mapStoreStateToProps, mapStoreDispatchToProps)(auth)