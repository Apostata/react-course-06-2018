import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import styles from './ContactData.scss';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state ={
        name:'',
        email: '',
        address:{
            street:'',
            number:'',
            postalCode:''
        },
        loading:false,
        submited:false
    }

    orderHandler(e){
        e.preventDefault();
       this.setState({loading:true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

            customer: {
                name: 'Rene Souza',
                address: {
                    street:'Rua das ruas',
                    zipCode: '1234451',
                    country: 'Brasil'
                },
                email: 'renre@teste.com.br'
            },
            deliveryMethod: 'espresso'
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

    render(){
        let formContent = 
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Seu Nome"/>
                <input className={styles.Input} type="email" name="email" placeholder="seu@email.com.br"/>
                <input className={styles.Input} type="text" name="street" placeholder="rua exemplo"/>
                <input className={styles.Input} type="text" name="number" placeholder="99"/>
                <input className={styles.Input} type="text" name="postalcode" placeholder="00000-000"/>
                <Button clicked={this.orderHandler.bind(this)} classe="Success">Finalizar Pedido</Button>
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