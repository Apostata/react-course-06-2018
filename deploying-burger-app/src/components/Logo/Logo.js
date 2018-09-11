import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.scss';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="Burger logo" />
    </div>
);

export default logo;