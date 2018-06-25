import React, { Component } from 'react';

import styles from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

	state = {
		persons: [
			{ id:'dhyuav', name: "Rene", age: 33 },
			{ id:'fseiof', name: "Érica", age: 29 },
			{ id:'nvbisb', name: "Helena", age: 0 }
		],
		otherState: "Some other state",
		showPersons: false
	}

	nameChangeHandler(event, id) {
		const personIndex = this.state.persons.findIndex(per =>{
			return per.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};

		person.name = event.target.value;
		
		const persons = [
			...this.state.persons
		];

		persons[personIndex] = person;

		this.setState({
			persons: persons
		})
	}

	togglePersonHandler(){
		const doesShow = this.state.showPersons;
		this.setState({
			showPersons: !doesShow
		});
	}

	deletePersonHandler(personIndex){
		//const persons = this.state.persons 			- Mutable
		//const persons = this.state.persons.slice();	- Imutable
		const persons = [ // - Imutable
			...this.state.persons
		];

		persons.splice(personIndex, 1);

		this.setState({
			persons: persons
		});
	}

	render() {

		let listPersons = null;

		if(this.state.showPersons){
			listPersons = (
				<Persons
					persons = {this.state.persons}
					clicked= {this.deletePersonHandler.bind(this)}
					changed ={this.nameChangeHandler.bind(this)}
				/>
			);	
		}

		return (
			<div className={styles.App}>
				<Cockpit
					appTitle = {this.props.title}
					showPersons = {this.state.showPersons}
					qtdPersons = {this.state.persons.length}
					clicked = {this.togglePersonHandler.bind(this)}/>
				{listPersons}
			</div>
		);
	}
}

export default App;
