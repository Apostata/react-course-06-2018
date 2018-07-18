import React, {Component} from 'react';
import './Posts.css';
import Post from '../../components/Post/Post';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

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
        this.props.history.push(`/posts/${id}`);
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
            <section>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
                {/*relative path*/}
            </section>    
        );
    }
};

export default Posts;