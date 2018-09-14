import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition'

import './Modal.css';

const modal = (props) => {
    const animTiming = {
        enter: 400,
        exit: 400
    }

    return( 
        <CSSTransition
            in={props.show}
            timeout={animTiming}
            mountOnEnter
            unmountOnExit
            classNames={{
                enter: '',
                enterActive: 'open',
                exit: '',
                exitActive: 'close',
                appear: '',
                appearActive: ''
            }}>
            <div className="Modal">
                <h1>A Modal</h1>
                <button className="Button" onClick={props.toggleOpen}>Dismiss</button>
            </div>
        </CSSTransition>
    )
};

export default modal;