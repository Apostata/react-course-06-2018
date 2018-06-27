import React, { PureComponent } from 'react';
import Person from './Person/Person';

export default class Persons extends PureComponent{
    constructor(props){
		super(props);
		console.log('[Persons.js] Inside Constructor');
    }
    componentWillMount(){
		console.log('[Persons.js] Inside ComponentWillMount');
	}

	componentDidMount(){
		console.log('[Persons.js] Inside ComponentDidMount');
    }

    componentWillReceiveProps(nextProps){
        console.log('[UPDATE Persons.js] Iside componentWillReceiveProps', nextProps);
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[UPDATE Persons.js] Iside shouldComponentUpdate', nextProps, nextState);
    //         return  nextProps.persons !== this.props.persons 
    // }

    componentWillUpdate(nextProps, nextState){
        console.log('[UPDATE Persons.js] Iside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate(){
        console.log('[UPDATE Persons.js] Iside componentDidUpdate');
    }

    render(){
        console.log('[Persons.js] - Iside render');

        return this.props.persons.map((person, index) =>{
            
            return <Person 
                key = {person.id}
                //click = {function(){_this.props.clicked(index)}}
                click = {()=>{this.props.clicked(index)}}
                name = {person.name}
                age = {person.age}
                changed = {(event) => this.props.changed(event, person.id)}
            />
        });
    }  
}