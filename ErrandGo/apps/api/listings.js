import authStorage from '../auth/storage';
import client from './client'

const endpoint = '/items';




const getListings = () => client.get(endpoint);

const getUserListings = (userId) => client.get('/user/'+ userId + '/history');

const getUserReviews = (userId) => client.get('/user/'+ userId + '/reviews');

const getCategories = () => client.get('/category');
const addReview = async(review,item_id,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('message',review.message);
    data.append('item_id',item_id);
    data.append('user_id',user.user_id);

    return client.post('/items/'+item_id+'/reviews/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)})
}



const addListing = async(listing,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('title',listing.title);
    data.append('description',listing.description);
    data.append('price',listing.price);
    data.append('category',listing.category.id);
    data.append('user_id',user.user_id);


    return client.post('/items/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)})
}


export default {
    addListing,
    getListings,
    getUserListings,
    getUserReviews,
    addReview,
    getCategories,
};