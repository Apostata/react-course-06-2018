import React from 'react';
import styles from './Cockpit.css';

const cockpit = (props) =>{
    const classes = []
    let btnClass = '';

    if(props.showPersons){
        btnClass = styles.Red;
    }

    if(props.qtdPersons <= 2){
        classes.push(styles.Red);
    }

    if(props.qtdPersons <= 1){
        classes.push(styles.bold);
    }
    return(
        <div className={styles.Cockpit}>
            <h1>{props.appTitle}</h1>
            <p className={classes.join(' ')}>Funcionando</p>
            <button
                className={btnClass}
                onClick={props.clicked}
            >Switch name
            </button>
        </div>
    );
};

export default cockpit;