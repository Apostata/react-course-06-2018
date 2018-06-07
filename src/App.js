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

  switchNameHandler(newName){
    
    this.setState({
      persons:[
        {
          name: newName,
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

  nameChangeHandler(event){
    this.setState({
      persons:[
        {
          name: 'Max',
          age: 33
        },
        {
          name: event.target.value,
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

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '10px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>React App</h1>
        <button style={style} onClick={()=>this.switchNameHandler('Rene Fernando')}>Switch name</button>
        {/* usar ()=> no eventHandler não é bom para performance*/}
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}
        />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Rene Souza')}
          change={this.nameChangeHandler.bind(this)}>
          My hobbies: read
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
  }
}

export default App;
