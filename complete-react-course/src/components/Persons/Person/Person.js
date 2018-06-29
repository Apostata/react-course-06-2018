import React, {Component, Fragment} from 'react';

import styles from './Person.css';
import withClass from '../../hoc/withClass';
import PropTypes from 'prop-types';
import { AuthContext } from '../../containers/App';

class Person extends Component {

    inputElem = React.createRef();

    funcaoDoFilho(){
        this.inputElem.current.focus();
    }

    render(){
        return (
            <Fragment>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated</p> : null}
                </AuthContext.Consumer>  

                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    ref={this.inputElem}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
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
