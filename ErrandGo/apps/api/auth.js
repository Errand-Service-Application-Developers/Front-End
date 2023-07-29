import { create } from 'apisauce'


const apiClient = create({
    baseURL: 'http://errandapp-71874d388d6d.herokuapp.com'
})

const login = (username,password) => apiClient.post('/auth/jwt/create',{username,password});
const register = (userInfo) => apiClient.post('/auth/users/',userInfo);

export default {
    login,
    register,
};