import { date } from 'yup';
import client from './client'


const endpoint = '/items';

const getListings = () => client.get(endpoint);

const addListing = (listing,onUploadProgress)=>{
    const data = new FormData()
    data.append('title',listing.title);
    data.append('description',listing.description);
    data.append('price',listing.price);
    data.append('category',listing.category.value);

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
};