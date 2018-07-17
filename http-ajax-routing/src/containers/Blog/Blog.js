import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import {Route, NavLink, Switch} from 'react-router-dom';
import './Blog.css';
import FullPost from '../FullPost/FullPost';

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
                                <NavLink
                                    to="/"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle ={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}
                                >Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/novo-post',
                                    hash: '#submit',
                                    search:'?quick-submit=true'
                                }}>Novo Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/novo-post" component={NewPost} />
                    <Route path="/:id" exact component={FullPost} />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;