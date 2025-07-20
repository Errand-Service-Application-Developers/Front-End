import { create } from 'apisauce'

const apiClient = create({
    baseURL: 'http://192.168.100.20:8000',
})

const login = (username, password) => {
    console.log('Login data:', { username, password }); // Debug log
    return apiClient.post('/auth/jwt/create', { username, password });
};

const register = (userInfo) => {
    console.log('Register data:', userInfo); // Debug log
    return apiClient.post('/auth/users/', userInfo);
};

export default {
    login,
    register,
};