import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount(){
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(this.props.match.params.id, prevProps.match.params.id)
       if(this.props.match.params.id !== prevProps.match.params.id){
            this.loadData();
       }
    }

    loadData(){
        if(this.props.match.params.id){ //verifica não é nullo e...
            axios.get(`/posts/${this.props.match.params.id}`)
            .then(response =>{
                this.setState({loadedPost: response.data});
            });
        }
    }

    deletePost(){
        axios.delete(`/posts/${this.props.match.params.id}`)
        .then(response => console.log(response));
    }

    render () {
        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;

        if(this.props.id){
            post = <p style={{textAlign:"center"}}>Loading...</p>;
        }

        if(this.state.loadedPost){
            post = (
                <Fragment>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={()=>this.deletePost()} className="Delete" >Delete</button>
                    </div>
                </Fragment>
            );
        }
        return (
            <section className="FullPost">
                {post}
            </section>
        );
    }
}

export default FullPost;