import React, { Fragment, memo } from 'react';
import styles from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    
    let classes = [styles.Modal];
    if(props.show) classes.push(styles.show);
    classes.concat();

    return (
        <Fragment>
            <Backdrop show={props.show} click={props.backdropClick}/>
            <div className={classes.join(' ')}>
                {props.children}
            </div>
        </Fragment>    
    );
}
    

export default memo(modal, (prevProps, nextProps)=>{
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});