import React, {Fragment, Component} from 'react';
import styles from './Layout.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import {connect} from 'react-redux';

class Layout extends Component{
    state ={
        toggleSidedrawer: false
    }

    handleToggleSidedrawer(){
        this.setState((prevState)=>{
           return {toggleSidedrawer: !prevState.toggleSidedrawer}
        });
    }

    render(){
        return(
            <Fragment>
                <Toolbar isAuthenticated={this.props.isAuthenticated} toggleSidedrawer={this.handleToggleSidedrawer.bind(this)} />
                <Sidedrawer
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.state.toggleSidedrawer}
                    toggleSidedrawer={this.handleToggleSidedrawer.bind(this)}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStoreStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStoreStateToProps)(Layout);