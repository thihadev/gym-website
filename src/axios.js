import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fitness-latest.test/api',
    withCredentials: true, // Include cookies for Sanctum
});

export default instance;
