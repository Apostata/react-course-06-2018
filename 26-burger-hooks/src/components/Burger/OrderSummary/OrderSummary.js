import React, {Component, Fragment} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    render(){
        const ingredientSumary = Object.keys(this.props.ingredients)
            .map(igKey=>{
                return (
                    <li key={igKey+this.props.ingredients[igKey]}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Preço total: R$ {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Finalizar a compra?</p>
                <Button clicked={this.props.cancelClick} classe="Danger">CANCELAR</Button>
                <Button clicked={this.props.continueClick} classe="Success">PROCEDER</Button>
            </Fragment>
        )
    }
}

export default OrderSummary;