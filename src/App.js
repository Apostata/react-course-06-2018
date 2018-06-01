import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React App</h1>
        <Person name="Rene" age="33"/>
        <Person name="Érica" age="29">My hobbies: read</Person>
        <Person name="Helena" age="01"/>
      </div>
    );
  }
}

export default App;
