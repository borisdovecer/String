import axios from 'axios';

const api = axios.create({});

// Request interceptor
api.interceptors.request.use(
    (res) => {
        return res;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        // Handle error responses, like logging errors or showing error messages
        return Promise.reject(error);
    }
);

export default api;