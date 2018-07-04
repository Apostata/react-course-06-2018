import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    const ingredientSumary = Object.keys(props.ingredients)
        .map(igKey=>{
            return (
                <li key={igKey+props.ingredients[igKey]}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })
    
    return(
        <Fragment>
            <h3>Seu Pedido</h3>
            <p>Contendo os seguintes itens:</p>
            <ul>
                {ingredientSumary}
            </ul>
            <p><strong>Preço total: R$ {props.totalPrice.toFixed(2)}</strong></p>
            <p>Finalizar a compra?</p>
            <Button clicked={props.cancelClick} classe="Danger">CANCELAR</Button>
            <Button clicked={props.continueClick} classe="Success">PROCEDER</Button>
        </Fragment>
    )
}

export default orderSummary;