import authStorage from '../auth/storage';
import client from './client'

const endpoint = '/items';







const getListings = () => client.get(endpoint);

const getUserListings = (userId) => client.get('/user/'+ userId + '/history');

const getUserReviews = (userId) => client.get('/user/'+ userId + '/reviews');

const addListing = async(listing,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('title',listing.title);
    data.append('description',listing.description);
    data.append('price',listing.price);
    data.append('category',listing.category.value);
    data.append('user_id',user.user_id);

    listing.images.forEach((image,index) => data.append('images',{
        name: 'image' + index,
        type: 'image/jpeg',
        uri: image
    }));

    if (listing.location)
         data.append('location',JSON.stringify(listing.location)) 
    


    return client.post('/items/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)})
}


export default {
    addListing,
    getListings,
    getUserListings,
    getUserReviews,
};