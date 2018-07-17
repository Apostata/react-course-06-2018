import React, {Component} from 'react';
import styles from './Posts.css';
import Post from '../../components/Post/Post';
//import {Link} from 'react-router-dom';

import axios from '../../axios';

class Posts extends Component{
    state = {
        posts:[]
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('/posts')
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
            //this.setState({error:true});
        });
    }

    getFullPost(id){
        //this.setState({selectedId:id});
        
        //this.props.history.push({pathname:`/${id}`});
        //ou
        this.props.history.push(`/${id}`);
    }
    
    render(){
        let posts = <p style={{textAlign: "center"}}>Algo de errado não está certo!</p>
        
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={`/${post.id}`} key={post.id}>
                        <Post 
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            click={()=>this.getFullPost.bind(this)(post.id)}
                        />
                    // </Link>    
                )
            });
        }

        return(
            <section className="Posts">
                    {posts}
            </section>
        );
    }
};

export default Posts;