import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://buerger-app-b0c01.firebaseio.com/'
});

export default instance;