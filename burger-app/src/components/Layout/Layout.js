import React, {Fragment} from 'react';
import styles from './Layout.scss';

const layout = (props) =>(
    <Fragment>
        <div>
            toolbar, sideDrawer, backdrop
        </div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Fragment>
);

export default layout;