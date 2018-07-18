import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Rene',
        submited: false
    }

    componentDidMount(){
        console.log(this.props);
    }

    postDataHandler(){
        console.log('post');
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        }
        axios.post('/posts', data)
        .then(response =>{
            console.log(response);
            this.setState({
                submited: true
            });
        });
    }

    render () {
        let newPost = 
        <section className="NewPost">
            <h1>Add a Post</h1>
            <label>Title</label>
            <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
            <label>Content</label>
            <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
            <label>Author</label>
            <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                <option value="Rene">Rene</option>
                <option value="Helena">Helena</option>
            </select>
            <button onClick={()=>this.postDataHandler()}>Add Post</button>
        </section>;

        if(this.state.submited) newPost = <Redirect to="/posts" />;

        return newPost;            
    }
}

export default NewPost;