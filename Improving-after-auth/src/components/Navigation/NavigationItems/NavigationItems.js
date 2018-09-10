import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.scss';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact click={props.toggleSidedrawer}>BurgerBuilder</NavigationItem>
        {props.auth ? <NavigationItem link="/orders" >Orders</NavigationItem> : null }
        {props.auth ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/Auth">Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;