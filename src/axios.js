import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    timeout: 10000, // 10s — fail fast if backend unreachable
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically attach token to every request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
