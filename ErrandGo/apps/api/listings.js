import authStorage from '../auth/storage';
import client from './client'
import { Cloudinary} from 'cloudinary-react-native'

const endpoint = '/items';






const getListings = () => client.get(endpoint);

const getUserListings = (userId) => client.get('/user/'+ userId + '/history');

const getUserReviews = (userId) => client.get('/user/'+ userId + '/reviews');

const addReview = async(review,item_id,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('message',review.message);
    data.append('item_id',item_id);
    data.append('user_id',user.user_id);

    return client.post('/items/'+item_id+'/reviews/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)})
}



const addListing = async(listing,onUploadProgress)=>{

try {
        

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('title',listing.title);
    data.append('description',listing.description);
    data.append('price',listing.price);
    data.append('category',listing.category.value);
    data.append('user_id',user.user_id);

    await Promise.all(listing.images.map(async (image, index) => {
        const uploadResult = await Cloudinary.upload(image.path);
        const imageUrl = uploadResult.url;
  
        data.append('images', {
          name: 'image' + index,
          type: 'image/jpeg',
          uri: imageUrl,
        });
      }));


    return client.post('/items/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)});
} catch (error) {

    console.log(error);
        
}
}


export default {
    addListing,
    getListings,
    getUserListings,
    getUserReviews,
    addReview,
};