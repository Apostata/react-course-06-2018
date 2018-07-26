import React from 'react';
import styles from './Burger.scss';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
    let dynIngredients = Object.keys(props.ingredients) //transforma o objeto em um array
        .map(igKey =>{
            return [...Array(props.ingredients[igKey])]// retorna um array com a quantidade de cada ingrediente ex: [cheese, cheese]
            .map((_, i)=> {
                return <Ingredient key={igKey + i} type={igKey} />
            })
        }).reduce((acum, curr)=>{ //reduce((acumulado, currentValue)=>{}, initialValue)
            return acum.concat(curr);
        },[]);
        //console.log(dynIngredients);
    
    if(dynIngredients.length === 0){
        dynIngredients = <p>Nenhum Ingrediente adicionado!</p>
    }

    return(
        <div className={styles.Burger}>
            <Ingredient type="bread-top" />
            {dynIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
};
export default burger;