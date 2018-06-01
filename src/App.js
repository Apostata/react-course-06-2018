import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons:[
      {
        name: "Rene",
        age: 33
      },
      {
        name: "Érica",
        age: 29
      },
      {
        name: "Helena",
        age: 0
      }
    ]
  }

  switchNameHandler = () =>{
    //console.log('Was clicked');
    // DON'T do This -> this.state.persons[0].name = "Rene Souza";
    this.setState({
      persons:[
        {
          name: "Rene Souza",
          age: 33
        },
        {
          name: "Érica",
          age: 29
        },
        {
          name: "Helena",
          age: 1
        }
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>React App</h1>
        <button onClick={this.switchNameHandler}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My hobbies: read</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
    );
  }
}

export default App;
