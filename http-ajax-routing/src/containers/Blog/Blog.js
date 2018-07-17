import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import {Route, Link} from 'react-router-dom';
import './Blog.css';

class Blog extends Component {
    state = {
        selectedId: null,
        error: false
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to={{
                                    pathname: '/novo-post',
                                    hash: '#submit',
                                    search:'?quick-submit=true'
                                }}>Novo Post</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} />
                <Route path="/novo-post" component={NewPost} />
            </div>
        );
    }
}

export default Blog;