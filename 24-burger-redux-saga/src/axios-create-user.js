import axios from 'axios';
const API_KEY ="AIzaSyDOS0kiI8kBhQn8uDfHKtM1XQ6I0oFDIdc";
const instance = axios.create({
    baseURL: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
});

export default instance;