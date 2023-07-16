import authStorage from '../auth/storage';
import client from './client'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from '../config/firebase';

const endpoint = '/tasks';




const getListings = () => client.get(endpoint);

const getUserListings = (userId) => client.get('/users/'+ userId + '/history');

const getUserReviews = (userId) => client.get('/users/'+ userId + '/reviews');

const getCategories = () => client.get('/categories');
const addReview = async(review,item_id,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('message',review.message);
    data.append('item_id',item_id);
    data.append('user_id',user.user_id);

    return client.post('/tasks/'+item_id+'/reviews/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)})
}



const addListing = async(listing,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('title',listing.title);
    data.append('description',listing.description);
    data.append('price',listing.price);
    data.append('category',listing.category.id);
    data.append('user_id',user.user_id);
    



    const imageUrl = async (image) => {

        const filename =  image.split('/').pop()
        
        const response = await fetch(image);
        const blob = await response.blob();

        const imageRef = ref(storage, filename);
        const uploadImage = uploadBytes(imageRef, blob)

        try {
          await uploadImage;
          const downloadUrl = await getDownloadURL(imageRef)
          data.append('image_url',downloadUrl)
        } catch (error) {
          console.log(error);
        } 
    }

   await imageUrl(listing.images[0])
    
    

    if (listing.location)
         data.append('location',JSON.stringify(listing.location)) 
    

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