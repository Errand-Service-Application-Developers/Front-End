import client from './client';
import { create } from 'apisauce'


const apiClient = create({
    baseURL: 'http://192.168.43.173:8000'
})

const login = (username,password) => apiClient.post('/auth/jwt/create',{username,password})

export default {
    login,
};