import axios from 'axios';
import Cookies from 'js-cookie';
import { decryptObject } from './GlobalFunctions';
// Create an instance of Axios with default configuration
const Request = axios.create({
    baseURL: 'https://localhost:7114',
});

Request.interceptors.request.use(
    (config) => {
        const token = Cookies.get('X-CSRF');
        const decryptedToken = decryptObject(token)
        if (token) {
            config.headers.Authorization = `Bearer ${decryptedToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Request;
