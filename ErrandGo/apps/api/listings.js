import client from './client'


const getListings = () => client.get('/items')

export default{
    getListings,
}
