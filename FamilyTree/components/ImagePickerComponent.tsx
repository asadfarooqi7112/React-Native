import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert, Platform, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

interface ImagePickerComponentProps {
  setNodeImageUri: (uri: string) => void;
}
const ImagePickerComponent:React.FC<ImagePickerComponentProps> = (props) => {

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version < 29) {
      try {
        const granted = await requestMultiple([
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]);

        if (
          granted[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !== 'granted' ||
          granted[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] !== 'granted'
        ) {
          Alert.alert('Permissions required', 'Storage permissions are required to pick images.');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImage = async () => {
    try {
      const permission = await requestPermissions();
      if (!permission) {
        return;
      }

      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      props.setNodeImageUri(image.path);
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        Alert.alert('Cancelled', 'Image picking was cancelled.');
      } else {
        console.error('Error picking image', error);
        Alert.alert('Error', 'Error picking image');
      }
    }
  };

  return (
    <TouchableOpacity
    style={styles.pickImageButton}
    onPress={handleImage}
      >
    <Text style={styles.buttonText}>Pick Image</Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pickImageButton: {
    backgroundColor: '#3498db', // Green color as an example
    paddingHorizontal: 20,
    paddingVertical:10,
    marginBottom: 10,
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3, // for Android shadow
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default ImagePickerComponent;
