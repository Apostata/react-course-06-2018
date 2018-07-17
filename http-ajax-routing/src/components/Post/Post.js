import React from 'react';
import {withRouter} from 'react-router-dom';

import './Post.css';

const post = (props) => {
    console.log(props);
    return (
        <article className="Post" onClick={props.click}>
            <h1>{props.title ? props.title : "Title"}</h1>
            <div className="Info">
                <div className="Author">{props.author ? props.author : "Author"}</div>
            </div>
        </article>
    );
}

export default withRouter(post);