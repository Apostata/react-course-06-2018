import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.scss';

class ContactData extends Component {
    state ={
        name:'',
        email: '',
        address:{
            street:'',
            number:'',
            postalCode:''
        }
    }

    render(){
        return(
            <div className={styles.ContactData}>
                <h4>Insira seus dados para entrega</h4>
                <form>
                    <input className={styles.Input} type="text" name="name" placeholder="Seu Nome"/>
                    <input className={styles.Input} type="email" name="email" placeholder="seu@email.com.br"/>
                    <input className={styles.Input} type="text" name="street" placeholder="rua exemplo"/>
                    <input className={styles.Input} type="text" name="number" placeholder="99"/>
                    <input className={styles.Input} type="text" name="postalcode" placeholder="00000-000"/>
                    <Button clicked={this.props.enviar} classe="Success">Finalizar Pedido</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;