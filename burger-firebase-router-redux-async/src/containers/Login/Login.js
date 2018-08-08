import React, {Component} from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Login extends Component {
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
        formIsValid: false
    }

    submitedHandler(){
        this.props.purchaseEnded();
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

        for(let key in this.state.orderForm){
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
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
        }
    )
    let form = 
        <form onSubmit={this.submitedHandler.bind(this)}>
            {outputElements}
            <Button classe="Success" disabled={!this.state.formIsValid}>Logar</Button>
        </form>;
     


        return form;
    }
}

export default withErrorHandler(Login, axios);