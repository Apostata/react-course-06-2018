import React from '../../../../../../../../Users/tak_esouza/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import styles from './Backdrop.scss';

const backdrop = (props)=> (
    props.show ? <div className={styles.Backdrop} onClick={props.click}></div>: null
);

export default backdrop;