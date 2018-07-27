import React from 'react';
import styles from './Order.scss';

const order = (props) => (
    <div className={styles.Order}>
        <p>Ingredientes: Salad(1)</p>
        <p>Preço: <strong>R$ 18,50</strong></p>
    </div>
);

export default order;