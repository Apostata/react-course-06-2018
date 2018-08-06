import React from '../../../../../../../../Users/tak_esouza/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
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
            disabled={props.disabled}
        >{props.children}</button>
    );
}
export default button;