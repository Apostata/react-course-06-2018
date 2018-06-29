import React, {Component, Fragment} from 'react';

import styles from './Person.css';
import withClass from '../../hoc/withClass';
import PropTypes from 'prop-types';

class Person extends Component {
        
    render(){
        return (
            <Fragment>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </Fragment>
        );
    }
}

Person.propTypes = {
	click: PropTypes.func, //click precisa ser function
	name: PropTypes.string, //name precisa ser string
	age: PropTypes.number, //number precisa ser numérico
	changed: PropTypes.func //changed precisa ser function
};

export default withClass(Person, styles.Person);
