import axios from 'axios'

const service = axios.create({
    baseURL: '/static',
    timeout: 3000
});

export default service;