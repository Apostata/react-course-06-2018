import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import * as actionsCreators from '../../store/actions/actions';

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
                <CounterControl label="Add 5" clicked={()=>{this.props.onAddQtdToCounter(5)}}  />
                <CounterControl label="Subtract 5" clicked={()=>{this.props.onSubtractQtdToCounter(5)}}  />
                <hr />
                <button onClick={()=>{this.props.onStoreResult(this.props.ctr)}}>Store Result</button>
                <ul>
                    {this.props.storedResults
                        .map(singleResult =><li onClick={()=>{this.props.onDeleteResult(singleResult.id)}} key={singleResult.id} >{singleResult.value}</li>)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state =>{//nomenclatura é para transformar o stado da store em props para o componente
    return { //recebe state e define ctr = a state.counter(que esta na store) passa como se fosse 
            //de um componente pai
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch =>{ //passa uma action via props para o componente
    return { 
        onIncrementCounter: () => dispatch(actionsCreators.increment()),
        onDecrementCounter: () => dispatch(actionsCreators.decrement()),
        onAddQtdToCounter: (qtd) => dispatch(actionsCreators.addQtd(qtd)),
        onSubtractQtdToCounter: (qtd) => dispatch(actionsCreators.subtractQtd(qtd)),
        onStoreResult: (res) => dispatch(actionsCreators.asyncStoreResult(res)),
        onDeleteResult: (id) => dispatch(actionsCreators.deleteResult(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);//conecta o state recebido da store com o a props do componente
//connect returns a high order component