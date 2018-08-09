import React from 'react';
import styles from './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button';

const toolbar = (props) =>(
    <header className={styles.Toolbar}>
        <Button clicked={props.toggleSidedrawer} classe="DrawerToggle">Menu</Button>
        <Logo />
        <nav className={styles.DesktopOnly}>
            <NavigationItems auth={props.isAuthenticated}/>
        </nav>
    </header>
);

export default toolbar;