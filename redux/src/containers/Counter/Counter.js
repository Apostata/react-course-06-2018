import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                {/*<CounterOutput value={this.state.counter} />  antes do redux*/ }
                <CounterOutput value={this.props.ctr} />{/*com redux*/}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddQtdToCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractQtdToCounter}  />
            </div>
        );
    }
}

const mapStateToProps = state =>{//nomenclatura é para transformar o stado da store em props para o componente
    return { //recebe state e define ctr = a state.counter(que esta na store) passa como se fosse 
            //de um componente pai
        ctr: state.counter
    };
};

const mapDispatchToProps = dispatch =>{ //passa uma action via props para o componente
    return { 
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddQtdToCounter: () => dispatch({type: 'ADD_QTD', amount:5}),
        onSubtractQtdToCounter: () => dispatch({type: 'SUBTRACT_QTD', amount:5})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);//conecta o state recebido da store com o a props do componente
//connect returns a high order component