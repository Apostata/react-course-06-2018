import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

//criando interceptors

var reqInterceptor = axios.interceptors.request.use(
    request => {
        console.log(request);
        return request;
    },

    error => {
        return Promise.reject(error)
    }
);

var resInterceptor = axios.interceptors.response.use(
    response =>{
        console.log(response);
        return response;
    },
    error => {
        console.log(error);
    }
);

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//romovendo interceptors
// axios.interceptors.request.eject(reqInterceptor);
// axios.interceptors.response.eject(resInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
