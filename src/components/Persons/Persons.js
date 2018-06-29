import React, { PureComponent } from 'react';
import Person from './Person/Person';

export default class Persons extends PureComponent{
    
    render(){
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