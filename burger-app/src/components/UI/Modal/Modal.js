import React, {Component, Fragment} from 'react';
import styles from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nexProps, nextState){
        return nexProps.show !== this.props.show;
    }
    
    render(){
        let classes = [styles.Modal];
        if(this.props.show) classes.push(styles.show);
        classes.concat();

        return (
            <Fragment>
                <Backdrop show={this.props.show} click={this.props.backdropClick}/>
                <div className={classes.join(' ')}>
                    {this.props.children}
                </div>
            </Fragment>    
        );
    }
}
    

export default Modal;