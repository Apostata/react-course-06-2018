import React from 'react';
import styles from './Button.scss';

const button = (props)=>{
    if(props.classe === "DrawerToggle"){
        return (
            <div
            onClick={props.clicked}
            className={[styles.Button, styles[props.classe]].join(' ')}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
        )
    }
    return (
        <button
            onClick={props.clicked}
            className={[styles.Button, styles[props.classe]].join(' ')}
        >{props.children}</button>
    );
}
export default button;