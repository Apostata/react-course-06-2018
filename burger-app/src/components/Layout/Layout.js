import React, {Fragment, Component} from 'react';
import styles from './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

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
                <Toolbar toggleSidedrawer={this.handleToggleSidedrawer.bind(this)} />
                <Sidedrawer
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

export default Layout;