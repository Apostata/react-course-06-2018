import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import counterReducer from  './store/reducers/counter';
import resultsReducer from  './store/reducers/results';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

const combinedReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
});

const logger = store => {
    return next => {
        return action =>{
            console.log('[Midddleware] Dispatching', action);
            const result  = next(action);
            console.log('[Midddleware] Next State', store.getState());
            return result;
        }
    }
};

const store = createStore(combinedReducer, applyMiddleware(logger));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
