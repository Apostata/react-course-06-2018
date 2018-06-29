import React, {Fragment} from 'react';

//import Aux from '../hoc/Auxiliary';

import styles from './Cockpit.css';

const cockpit = (props) =>{
    const classes = []
    let btnClass = styles.Button;

    if(props.showPersons){
        btnClass = [styles.Button, styles.Red].join(' ');
    }

    if(props.qtdPersons <= 2){
        classes.push(styles.Red);
    }

    if(props.qtdPersons <= 1){
        classes.push(styles.bold);
    }
    return (
        <Fragment>
            <h1>{props.appTitle}</h1>
            <p className={classes.join(' ')}>Funcionando</p>
            <button
                className={btnClass}
                onClick={props.clicked}
            >Switch name
            </button>
        </Fragment>
    )
};

export default cockpit;