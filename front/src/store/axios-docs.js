import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${store.auth.token}`,
    // Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;