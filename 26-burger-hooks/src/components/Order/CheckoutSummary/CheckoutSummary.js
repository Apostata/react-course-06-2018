import React from 'react';
import Burger from '../../Burger/Burger';
import styles from './CheckoutSummary.scss';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div className={styles.CheckoutSummary}>
            <h1>Esperamos que goste!</h1>
            <div style={{width:"100%", margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>

            <Button clicked={props.cancel} classe="Danger">CANCELAR</Button>
            <Button clicked={props.continue} classe="Success">PROCEDER</Button>
        </div>
    );
};

export default checkoutSummary;