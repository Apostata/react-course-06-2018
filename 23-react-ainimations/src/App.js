import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

import Transition from 'react-transition-group/Transition'

class App extends Component {
  state = {
    modalShow:false,
    showBlock: false,
  }

  toggleOpen(){
    this.setState({
      modalShow: !this.state.modalShow
    })
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button onClick={()=> this.setState(prevState =>({showBlock: !prevState.showBlock}))}>Toggle</button>
        
        <br/>
        
        <Transition 
          in={this.state.showBlock}
          timeout={{enter:500, exit:500}}
          mountOnEnter
          unmountOnExit
          onEnter={()=>console.log('after in set to true')}
          onEntering={()=>console.log('init enter timeout')}
          onEntered={()=>console.log('finish enter timeout')}
          onExit={()=>console.log('after in set to false')}
          onExiting={()=>console.log('init exit timeout')}
          onExited={()=>console.log('finish exit timeout')}
          >
          {state => (
            <div style={{
              backgroundColor:"red",
              width:100,
              height:100,
              margin: "auto",
              opacity: state === 'exiting' ? 0: state === 'entering' ? 0 : 1,
              transition: "opacity 500ms ease-out" 
            }}
            />
          )}
        </Transition>
            
        
        <Modal show={this.state.modalShow} toggleOpen={this.toggleOpen.bind(this)}/>
        {this.state.modalShow ? <Backdrop show toggleOpen={this.toggleOpen.bind(this)} />: null}
        
        <button className="Button" onClick={this.toggleOpen.bind(this)}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
