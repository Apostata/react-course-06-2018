import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.scss';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
        <NavigationItem link="/Orders">Orders</NavigationItem>
        <NavigationItem link="/Auth">Authenticate</NavigationItem>
    </ul>
);

export default navigationItems;