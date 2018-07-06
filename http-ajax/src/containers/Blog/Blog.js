import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    
    state = {
        posts:[],
        selectedPost:null
    }

    getFullPost(id){
        const selectedPost = this.state.posts.filter(post => id === post.id);
        this.setState({selectedPost:selectedPost[0]});
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);

            const updatedPosts = posts.map(post =>{
                return {
                    ...post,
                    author: 'Rene'
                }
            });

            console.log(updatedPosts);

            this.setState({posts: updatedPosts});
        });
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post 
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        click={()=>this.getFullPost.bind(this)(post.id)}
                    />
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost post={this.state.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;