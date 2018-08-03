import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import counterReducer from  './store/reducers/counter';
import resultsReducer from  './store/reducers/results';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));


ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
