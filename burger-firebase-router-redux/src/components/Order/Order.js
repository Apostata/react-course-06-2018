import React from 'react';
import styles from './Order.scss';

const order = (props) => {

    const ingredientes = [];
    for (let name in props.ingredients){
        ingredientes.push({
            name: name,
            amount:props.ingredients[name]
        });
    }

    const ingredientOutput = ingredientes.map(
                (ingrediente ) => {
                    return(
                        <span 
                        style={{
                                textTransform:"captalize",
                                display: 'inline-block',
                                margin: '0 8px',
                                border: '1px solid #ccc',
                                padding: '5px'
                            }} key={ingrediente.name} >
                            {ingrediente.name} ({ingrediente.amount})
                        </span>
                    )
                })

    return(
        <div className={styles.Order}>
            <p>Ingredientes: {ingredientOutput}</p>
            <p>Preço: <strong>R$ {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;