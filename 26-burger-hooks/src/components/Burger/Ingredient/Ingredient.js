import React from 'react';
import styles from './Ingredient.scss';
import PropTypes from 'prop-types';

const ingredient = props => {
   
    let ingredientRender = null;

    switch(props.type){
        case ('bread-bottom'):
            ingredientRender = <div className={styles.BreadBottom}></div>;
            break;

        case ('bread-top'):
            ingredientRender = (
                <div className={styles.BreadTop}>
                    <div className={styles.Seeds1}></div>
                    <div className={styles.Seeds2}></div>
                </div>
            );
            break;

        case ('meat'):
            ingredientRender = <div className={styles.Meat}></div>;
            break;
        
        case ('cheese'):
            ingredientRender = <div className={styles.Cheese}></div>;
            break;
        
        case ('bacon'):
            ingredientRender = <div className={styles.Bacon}></div>;
            break;

        case ('salad'):
            ingredientRender = <div className={styles.Salad}></div>;
            break;

        default:
            ingredientRender = null;
    }
    return ingredientRender;
    
};

ingredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default ingredient;