import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL;

console.log('url:', url);

const axiosClient = axios.create({
    baseURL: url
});

export default axiosClient;