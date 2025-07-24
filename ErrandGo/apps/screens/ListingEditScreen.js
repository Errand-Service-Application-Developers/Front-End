import React, { useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';
import LottieView from 'lottie-react-native';

import Screen from './Screen';
import { AppForm, AppFormField, SubmitButton} from '../components/forms'
import AppFormPicker from '../components/forms/AppFormPicker';
import FormImagePicker from '../components/forms/FormImagePicker';
import CategoryPickerItem from '../components/CategoryPickerItem';
import useLocation from '../hooks/useLocation';
import listingsApi from '../api/listings';
import UploadScreen from '../components/UploadScreen';
import colors from '../config/colors';


const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    description: Yup.string().required().label('Description'),
    category: Yup.object().required().nullable().label('Category'),
    price: Yup.number().required().min(1).label('Price'),
    images: Yup.array().min(0,"Images are optional").max(5,"You can select up to 5 images")
})


function ListingEditScreen(props) {
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [smoothProgress, setSmoothProgress] = useState(0);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const scrollView = useRef();
    const [formKey, setFormKey] = useState(0);
    const progressInterval = useRef(null);



    useEffect(() =>{
        loadcategories();
        
        // Cleanup function to clear interval on unmount
        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    
    },[])

    const loadcategories = async () =>{
       const result = await listingsApi.getCategories();

       if (!result.ok){
        return;
       }
       setCategories(result.data)

    }



    // Smooth progress animation function
    const animateProgress = (targetProgress) => {
        const currentProgress = smoothProgress;
        const difference = targetProgress - currentProgress;
        const steps = 30; // Number of animation steps
        const stepSize = difference / steps;
        
        let currentStep = 0;
        
        // Clear any existing interval
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
        
        progressInterval.current = setInterval(() => {
            currentStep++;
            const newProgress = currentProgress + (stepSize * currentStep);
            
            if (currentStep >= steps || newProgress >= targetProgress) {
                setSmoothProgress(targetProgress);
                clearInterval(progressInterval.current);
                progressInterval.current = null;
            } else {
                setSmoothProgress(newProgress);
            }
        }, 100); // Update every 100ms for smoother animation
    };

    const handleSubmit = async (listing, actions) => {
        setProgress(0);
        setSmoothProgress(0);
        setUploadVisible(true);
        setShowSuccessAnimation(false);

        try {
            const result = await listingsApi.addListing(
                {...listing, image_uploads: listing.images}, 
                (uploadProgress) => {
                    console.log("Upload progress:", uploadProgress);
                    setProgress(uploadProgress);
                    
                    // Animate progress more slowly and smoothly
                    // Add a slight delay and smooth animation
                    setTimeout(() => {
                        animateProgress(uploadProgress * 0.9); // Show 90% during upload
                    }, 200);
                }
            );

            console.log("Result: ", result);

            if (!result.ok) {
                setUploadVisible(false);
                setSmoothProgress(0);
                setShowSuccessAnimation(false);
                if (progressInterval.current) {
                    clearInterval(progressInterval.current);
                }
                console.log("Error uploading listing: ", result.data);
                return;
            }

            // Show final progress animation to 100%
            animateProgress(1);
            
            // Wait for progress to complete, then show success animation
            setTimeout(() => {
                setUploadVisible(false);
                setShowSuccessAnimation(true);
                
                // Hide success animation and reset form after showing it
                setTimeout(() => {
                    setShowSuccessAnimation(false);
                    actions.resetForm();
                    setSmoothProgress(0);
                    if (progressInterval.current) {
                        clearInterval(progressInterval.current);
                    }
                }, 2000); // Show success animation for 2 seconds
                
            }, 3000); // Wait 3 seconds for progress to complete

        } catch (error) {
            console.log("Upload failed:", error);
            setUploadVisible(false);
            setSmoothProgress(0);
            setShowSuccessAnimation(false);
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        }
    }


    useFocusEffect(
      React.useCallback(() => {
        // On blur, increment formKey to reset form
        return () => {
          setFormKey((k) => k + 1);
        };
      }, [])
    );

    return (
      <ScrollView ref={scrollView} style={{ backgroundColor: colors.light }}>
        <Screen style={styles.screen}>
          <UploadScreen onDone={() => setUploadVisible(false)} progress={smoothProgress} visible={uploadVisible} />
          
          {/* Success Animation Modal */}
          {showSuccessAnimation && (
            <View style={styles.successOverlay}>
              <View style={styles.successContainer}>
                <LottieView
                  source={require('../assets/animations/done.json')}
                  autoPlay
                  loop={false}
                  style={styles.successAnimation}
                />
                <Text style={styles.successText}>Product Added Successfully!</Text>
                <Text style={styles.successSubtext}>Your product is now live and ready for customers</Text>
              </View>
            </View>
          )}
          
          <View style={styles.cardContainer}>
            <Text style={styles.header}>Add New Product</Text>
            <Text style={styles.hint}>Select up to 5 images and fill in the details below.</Text>
            <AppForm
              key={formKey}
              initialValues={{
                title: "",
                description: "",
                category: null,
                price: "",
                images: []
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <FormImagePicker name="images" />
              <AppFormField
                name="title"
                placeholder="Title"
                maxLength={255}
                style={styles.input}
              />
              <AppFormField
                fieldWidth="40%"
                name="price"
                maxLength={8}
                placeholder="Price"
                keyboardType="numeric"
                style={styles.input}
              />
              <AppFormPicker
                PickerItemComponent={CategoryPickerItem}
                numberOfColumns={3}
                items={categories}
                fieldWidth="70%"
                name="category"
                placeholder="Category"
                style={styles.input}
              />
              <AppFormField
                name="description"
                placeholder="Description"
                maxLength={255}
                multilines
                numberOfLines={3}
                style={styles.input}
              />
              <SubmitButton title="Post" style={styles.submitButton} />
            </AppForm>
          </View>
        </Screen>
      </ScrollView>
    );
}


const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginVertical: 18,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  hint: {
    padding: 5,
    color: colors.grey,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  imagePickerRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePicker: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  chipScrollContainer: {
    marginVertical: 8,
  },
  chip: {
    backgroundColor: colors.light,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  input: {
    backgroundColor: colors.light,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 10,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: colors.primary,
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  successAnimation: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 20,
  },
});



export default ListingEditScreen;
