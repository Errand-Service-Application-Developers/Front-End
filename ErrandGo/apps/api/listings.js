import authStorage from '../auth/storage';
import client from './client'
import mime from 'mime';

const endpoint = '/tasks';




const getListings = () => client.get(endpoint);

const getUserListings = (userId) => client.get('/users/'+ userId + '/history');

const getUserReviews = (userId) => client.get('/users/'+ userId + '/reviews');

const getUserOwnedRequests = (userId) => client.get('/users/'+ userId + '/ownedrequests');

const getUserSentRequests = (userId) => client.get('/users/'+ userId + '/sentrequests');

const getCategories = () => client.get('/categories');



const deleteReview = (item,review) => client.delete('/tasks/'+ item + '/reviews/'+ review + '/')

const deleteTask = (task) => client.delete('/tasks/'+ task + '/')

const deleteRequest = (request) => client.delete('/requests/'+ request + '/')



const UpdateTaskStatus  = (task,status) => client.patch('/tasks/'+ task + '/',{task_status: status});



const UpdateRequestStatus  = (request,status) => client.patch('/requests/'+ request + '/',{status: status});





const makeRequest = async(task,owner)=>{

  const user = await authStorage.getUser();

  const data = new FormData()
  data.append('task_id',task);
  data.append('owner_id',owner);
  data.append('requester_id',user.user_id);

  return client.post('/requests/',data)
}


const addReview = async(review,item_id,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('message',review.message);
    data.append('item_id',item_id);
    data.append('user_id',user.user_id);

    return client.post('/tasks/'+item_id+'/reviews/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)})
}


const addReply = async(reply,item_id,review_id,onUploadProgress)=>{

  const user = await authStorage.getUser();

  

  const data = new FormData()
  data.append('review_id',review_id);
  data.append('reply',reply.message);
  data.append('user_id',user.user_id);
  data.append('item_id',item_id);


  return client.post('/tasks/'+item_id+'/reviews/'+review_id+'/replies/',data,{onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)})
}


const addListing = async(listing,onUploadProgress)=>{

    const user = await authStorage.getUser();

    const data = new FormData()
    data.append('title',listing.title);
    data.append('description',listing.description);
    data.append('price',listing.price);
    data.append('category',listing.category.id);
    data.append('user_id',user.user_id);

    // Handle multiple images - append each image individually
    if (listing.image_uploads && listing.image_uploads.length > 0) {
        listing.image_uploads.forEach((imageUri, index) => {
            const fileType = mime.getType(imageUri);
            const fileName = imageUri.split('/').pop();

            data.append('image_uploads', {
                uri: imageUri,
                type: fileType,
                name: fileName,
            });
        });
    }

    return client.post('/tasks/',
      data,
      {
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)
      }
    );

}


export default {
    addListing,
    getListings,
    getUserListings,
    getUserReviews,
    addReview,
    getCategories,
    deleteReview,
    deleteTask,
    addReply,
    makeRequest,
    getUserOwnedRequests,
    getUserSentRequests,
    deleteRequest,
    UpdateTaskStatus,
    UpdateRequestStatus

};