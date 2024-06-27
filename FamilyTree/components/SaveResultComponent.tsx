import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import RNFS from 'react-native-fs';

interface DownloadResultComponentProps {
  finalTreeImageUri: string;
}

const SaveResultComponent: React.FC<DownloadResultComponentProps> = ({ finalTreeImageUri }) => {
  const saveImageToFolder = async () => {
    const fileName = finalTreeImageUri.split('/').pop();
    const folderPath = `${RNFS.ExternalStorageDirectoryPath}//Pictures/FamilyTree`;
    const destPath = `${folderPath}/${fileName}`;

    try {
      // Check if the folder exists, if not, create it
      const folderExists = await RNFS.exists(folderPath);
      if (!folderExists) {
        await RNFS.mkdir(folderPath);
      }

      // Copy the image from local file URI
      const sourcePath = finalTreeImageUri.replace('file://', '');
      await RNFS.copyFile(sourcePath, destPath);

      Alert.alert('Success', `Image saved successfully`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save image. Please try again.');
      console.error(error);
    }
  };

  return (
    <TouchableOpacity style={styles.downloadButton} onPress={saveImageToFolder}>
      <Text style={styles.buttonText}>Save Photo</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: '#1E90FF', // Blue color as an example
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3, // for Android shadow
    width: '80%',
  },
});

export default SaveResultComponent;
