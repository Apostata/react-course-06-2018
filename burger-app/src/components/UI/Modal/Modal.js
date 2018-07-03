import React from 'react';
import styles from './Modal.scss';

const modal = (props) => (
    <div className={styles.Modal}>
        {props.children}
    </div>
);

export default modal;