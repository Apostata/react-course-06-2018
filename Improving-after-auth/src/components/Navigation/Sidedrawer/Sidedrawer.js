import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Sidedrawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidedrawer = (props) =>{
    return (
        <Fragment>
            <Backdrop show={props.show} click={props.toggleSidedrawer} />
            <div className={[styles.Sidedrawer, props.show ? styles.Open : null].join(" ")}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems auth={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    );
}

export default sidedrawer;