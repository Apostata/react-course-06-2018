import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers} from 'redux';
import counterReducer from  './store/reducers/counter';
import resultsReducer from  './store/reducers/results';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

const combinedReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
})
const store = createStore(combinedReducer);

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
