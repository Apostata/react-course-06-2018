import React, { PureComponent, Fragment } from 'react';

import styles from './App.css';
import Persons from '../Persons/Persons';
import Cockpit from '../Cockpit/Cockpit';
//import WithClass from '../hoc/WithClass';
import withClass from '../hoc/withClass';

class App extends PureComponent {
	constructor(props){
		super(props);
		console.log('[App.js] Inside Constructor');
	}

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

	componentWillMount(){
		console.log('[App.js] Inside ComponentWillMount');
	}

	componentDidMount(){
		console.log('[App.js] Inside ComponentDidMount');
	}

	// shouldComponentUpdate(nextProps, nextState){
    //     console.log('[UPDATE App.js] Iside shouldComponentUpdate', nextProps, nextState);
	// 		return nextState.persons !== this.state.persons ||
	// 			   nextState.showPersons !== this.state.showPersons;
    // }

    componentWillUpdate(nextProps, nextState){
        console.log('[UPDATE App.js] Iside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate(){
        console.log('[UPDATE App.js] Iside componentDidUpdate');
    }

	render() {
		console.log('[App.js] - Iside render');
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
			<Fragment>
				<button onClick={()=>{this.setState({showPersons:true})}}>Show Persons</button>
				<Cockpit
					appTitle = {this.props.title}
					showPersons = {this.state.showPersons}
					qtdPersons = {this.state.persons.length}
					clicked = {this.togglePersonHandler.bind(this)}/>
				{listPersons}
			</Fragment>
		);
	}
}

export default withClass(App, styles.App);
