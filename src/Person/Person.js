import React from 'react';

import styles from './Person.css';

const person = (props) => {

    const rdn = Math.random();

    if(rdn > 0.7){
        throw new Error('Algo de errado não está certo!');
    }


    return (
        <div className={styles.Person} >
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    );
}
export default person;