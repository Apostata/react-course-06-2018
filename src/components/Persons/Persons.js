import React, { PureComponent } from 'react';
import Person from './Person/Person';

export default class Persons extends PureComponent{

    lastPersonRef = React.createRef()

    componentDidMount(){
        this.lastPersonRef.current.funcaoDoFilho();
    }
    
    render(){
        return this.props.persons.map((person, index) =>{
            
            return <Person 
                key = {person.id}
                position = {index}
                click = {()=>{this.props.clicked(index)}}
                name = {person.name}
                ref={this.lastPersonRef}
                age = {person.age}
                changed = {(event) => this.props.changed(event, person.id)}
            />
        });
    }  
}