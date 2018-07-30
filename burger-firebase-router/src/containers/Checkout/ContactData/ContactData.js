import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';

import styles from './ContactData.scss';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state ={
        orderForm:{
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
        },
        loading:false,
        formIsValid: false,
        submited:false
    }

    orderHandler(e){
        e.preventDefault();
       this.setState({loading:true});
        const formData = {};

        for(let formElementId in this.state.orderForm){
            formData[formElementId] =  this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        
        axios.post('/orders.json', order)  //.json por conta do firebase
            .then(response =>{
                this.setState({loading:false, submited:true});
                
            })
            .catch(error => {
                this.setState({loading:false, submited:false});
            });
    }
    

    submitedHandler(){
        this.props.history.push('/');
    }

    inputChangeHandler(e, inputId){
        
        const clonedForm = {
            ...this.state.orderForm           
        };

        const clonedSelectedElement = {
            ...clonedForm[inputId]   
        };

        clonedSelectedElement.value = e.target.value;
        clonedSelectedElement.valid = this.checkValidaty(clonedSelectedElement.value, clonedSelectedElement.validation)
        clonedSelectedElement.touched = true;
        clonedForm[inputId] = clonedSelectedElement;

        let formIsValid = true;

        for(let input in clonedForm){
            formIsValid = clonedForm[input].valid && formIsValid;
        }

        this.setState({
            orderForm: clonedForm,
            formIsValid
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

        return isValid;
    }

    render(){
        const formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

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
            }
        )
        let formContent = 
            <form onSubmit={this.orderHandler.bind(this)}>
                {outputElements}
                <Button classe="Success" disabled={!this.state.formIsValid}>Finalizar Pedido</Button>
            </form>;
            

        if(this.state.loading){
            formContent = <Spinner />
        }
        return(
            <div className={styles.ContactData}>
                <h4>Insira seus dados para entrega</h4>
                {formContent}
                <Modal show={this.state.submited} backdropClick={this.submitedHandler.bind(this)}>
                    <p>Pedido enviado com sucesso!</p>
                </Modal>
            </div>
        );
    }
}

export default ContactData;