import { create } from 'apisauce'

const apiClient = create({
    baseURL: 'http://192.168.126.239:8050',
})

const login = (email, password) => {
    console.log('Login data:', { email, password }); // Debug log
    return apiClient.post('/auth/jwt/create', { email, password });
};

const register = (userInfo) => {
    console.log('Register data:', userInfo); // Debug log
    return apiClient.post('/auth/users/', userInfo);
};

export default {
    login,
    register,
};