import React from 'react';
import styles from './Backdrop.scss';

const backdrop = (props)=> (
    props.show ? <div className={styles.Backdrop} onClick={props.click}></div>: null
);

export default backdrop;