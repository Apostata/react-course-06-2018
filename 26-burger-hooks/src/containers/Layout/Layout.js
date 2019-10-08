import React, {Fragment, useState} from 'react';
import styles from './Layout.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import {connect} from 'react-redux';

const layout = props => {
    const [sidedrawerState, setSidedrawerState] = useState(false)

    const handleToggleSidedrawer = () =>{
        setSidedrawerState(!sidedrawerState);
    }

    return(
        <Fragment>
            <Toolbar isAuthenticated={props.isAuthenticated} toggleSidedrawer={handleToggleSidedrawer} />
            <Sidedrawer
                isAuthenticated={props.isAuthenticated}
                show={sidedrawerState}
                toggleSidedrawer={handleToggleSidedrawer}
            />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStoreStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStoreStateToProps)(layout);