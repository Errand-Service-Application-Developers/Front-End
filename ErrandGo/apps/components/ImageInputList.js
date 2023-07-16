import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris[0] ? ( // Check if the first image URI exists
            <View style={styles.image}>
              <ImageInput
                imageUri={imageUris[0]}
                onChangeImage={()=>onRemoveImage(imageUris[0])} // Use onRemoveImage to handle image removal
              />
            </View>
          ) : null}
          {imageUris[0] ? null : ( // If the first image URI doesn't exist, render the second ImageInput
            <View style={styles.image}>
              <ImageInput onChangeImage={onAddImage} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 8,
  },
});

export default ImageInputList;
