import React, { Component } from 'react';

import styles from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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

		let persons = null,
			classes = [],
			btnClass = '';

		if(this.state.showPersons){
			persons = (
				<div>
					{
						this.state.persons.map((person, index) =>{
							return (
								<ErrorBoundary key = {person.id}>	
									<Person 
										/*{key = {person.id}}*/
										click = {()=>this.deletePersonHandler(index)}
										name = {person.name}
										age = {person.age}
										changed = {(event) => this.nameChangeHandler(event, person.id)}
									/>
								</ErrorBoundary>
							);
						})
					}
				</div>
			);
			
			btnClass = styles.Red;
		}

		return (
			<div className={styles.App}>
				<h1>React App</h1>
				<p className={classes.join(' ')}>Funcionando</p>
				<button
				className={btnClass}
				onClick={() => this.togglePersonHandler()}>Switch name</button>
				{/* usar ()=> no eventHandler não é bom para performance*/}
				
				{persons}
				
			</div>
		);
	}
}

export default App;
