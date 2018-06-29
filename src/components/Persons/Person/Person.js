import React, {Component, Fragment} from 'react';

import styles from './Person.css';
import withClass from '../../hoc/withClass';

class Person extends Component {
    constructor(props){
		super(props);
		console.log('[Person.js] Inside Constructor');
    }
    componentWillMount(){
		console.log('[Person.js] Inside ComponentWillMount');
	}

	componentDidMount(){
		console.log('[Person.js] Inside ComponentDidMount');
    }
    
    render(){
        console.log('[Person.js] - Iside render');
        return (
            <Fragment>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </Fragment>
        );

        // return [
        //         <p key="1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
        //         <p key="2" >{this.props.children}</p>,
        //         <input key="3" type="text" onChange={this.props.changed} value={this.props.name}/>
        //     ];
    }
};

export default withClass(Person, styles.Person);
