import { create } from 'apisauce'



const apiClient = create({
     
    baseURL: 'http://192.168.43.173:8000/shop'

});

export default apiClient;

