import React, {Fragment} from 'react';
import styles from './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) =>(
    <Fragment>
        <Toolbar />
        sideDrawer, backdrop
        <main className={styles.Content}>
            {props.children}
        </main>
    </Fragment>
);

export default layout;