import React from 'react';
import styles from './Toolbar.scss';

const toolbar = (props) =>(
    <header className={styles.Toolbar}>
        <div>Menu</div>
        <div>Logo</div>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;