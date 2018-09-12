import React from 'react';
import styles from './PizzaImage.scss';
import PizzaImage from '../../assets/pizza.jpg';

const pizzaImage = () =>{
    <div className={styles.PizzaImage}>
        <img src={PizzaImage} className={styles.PizzaImg} />
    </div>
}

export default pizzaImage;