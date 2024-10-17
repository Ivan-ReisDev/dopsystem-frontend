import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dopsystem-backend.vercel.app/api/', 
  timeout: 30000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@Auth:Token') 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
