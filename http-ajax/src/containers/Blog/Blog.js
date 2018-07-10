import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    
    state = {
        posts:[],
        selectedId: null,
        error: false
    }

    getFullPost(id){
        this.setState({selectedId:id});
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

            this.setState({posts: updatedPosts});
        })
        .catch(error => {
            this.setState({error:true});
        });
    }

    render () {
        let posts = <p style={{textAlign: "center"}}>Algo de errado não está certo!</p>
        
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            click={()=>this.getFullPost.bind(this)(post.id)}
                        />
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;