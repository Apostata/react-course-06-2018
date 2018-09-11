import React from 'react';
import styles from './BuildControl.scss';

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button
            onClick={props.remove}
            className={styles.More}
            disabled={props.disabledLess}
        >Menos</button>
        <button
            onClick={props.add}
            className={styles.Less}
        >Mais</button>
    </div>
);

export default buildControl;