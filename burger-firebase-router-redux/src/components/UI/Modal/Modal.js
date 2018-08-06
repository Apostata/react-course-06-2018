import React, {Component, Fragment} from '../../../../../../../../Users/tak_esouza/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import styles from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nexProps, nextState){
        return nexProps.show !== this.props.show || nexProps.children !== this.props.children;
        //se props.show === true ou se alguma das props dos compoenentes filhos mudaram
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