import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const api: AxiosInstance = axios.create({});

// Request interceptor
api.interceptors.request.use(
    (res: InternalAxiosRequestConfig) => {
        return res;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        console.log(error);
        // Handle error responses, like logging errors or showing error messages
        return Promise.reject(error);
    }
);

export default api;