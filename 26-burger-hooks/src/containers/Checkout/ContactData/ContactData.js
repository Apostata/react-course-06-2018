import React, { useState } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import {updatedObject, checkValidaty} from '../../../utils/utility';

import styles from './ContactData.scss';

const contactData = props => {
    const [formState, setFormState] = useState(
        {
            name: {
                elementType:'input',
                attributes:{
                    type:'text',
                    placeholder: 'Seu Nome'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                attributes:{
                    type:'text',
                    placeholder: 'Logradouro'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType:'input',
                attributes:{
                    type:'text',
                    placeholder: 'Seu CEP'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 8,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            country:{
                elementType:'input',
                attributes:{
                    type:'text',
                    placeholder: 'País'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType:'input',
                attributes:{
                    type:'email',
                    placeholder: 'seu email'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType:'select',
                attributes:{
                    options:[
                        {value:'cheapest', text:'Mais Barata'},
                        {value:'fastest', text:'Mais Rápida'}
                    ]
                },
                value: 'cheapest',//concerta um bug
                validation:{},
                valid: true,
            } 
        }
    );

    const [formIsValidState, setFormIsValidState] = useState(false);

    const orderHandler = (e) =>{
        e.preventDefault();
        const formData = {};

        for(let formElementId in formState){
            formData[formElementId] =  formState[formElementId].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.asyncOrder(order, props.token);
    }
    

    const submitedHandler =() =>{
        props.purchaseEnded();
        props.history.push('/');
    }

    const inputChangeHandler = (e, inputId) =>{
        
        const clonedSelectedElement = updatedObject(formState[inputId],{
            value: e.target.value,
            valid: checkValidaty(e.target.value, formState[inputId].validation),
            touched: true
        });

        const clonedForm = updatedObject(formState, {
            [inputId] : clonedSelectedElement
        })


        let formIsValid = true;

        for(let input in clonedForm){
            formIsValid = clonedForm[input].valid && formIsValid;
        }

        setFormState(clonedForm);
        setFormIsValidState(formIsValid);
    }

    const formElements = [];
    for(let key in formState){
        formElements.push({
            id:key,
            config:formState[key]
        })
    }

    const outputElements = formElements.map(
        element => {
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
        }
    );

    let formContent = 
        <form onSubmit={orderHandler}>
            {outputElements}
            <Button classe="Success" disabled={!formIsValidState}>Finalizar Pedido</Button>
        </form>;
        

    if(props.loading){
        formContent = <Spinner />
    }
    return(
        <div className={styles.ContactData}>
            <h4>Insira seus dados para entrega</h4>
            {formContent}
            <Modal show={props.submited} backdropClick={submitedHandler.bind(this)}>
                <p>Pedido enviado com sucesso!</p>
            </Modal>
        </div>
    );
};

const mapStoreStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        orders: state.order.orders,
        loading: state.order.loading,
        submited: state.order.submited,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const  mapStoreDispatchToProps = dispatch =>{
    return {
        purchaseEnded:()=>{dispatch(actions.purchaseEnded())},
        asyncOrder:(order, token)=>{dispatch(actions.asyncOrder(order, token))}
    }
}

export default withErrorHandler(
    connect(mapStoreStateToProps, mapStoreDispatchToProps)(contactData),
    axios
);