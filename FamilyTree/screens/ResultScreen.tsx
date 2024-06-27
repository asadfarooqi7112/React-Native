// components/ResultScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Share from 'react-native-share';
import SaveResultComponent from '../components/SaveResultComponent';

interface DataEntry {
  Name: string;
  DOB: string;
  DOD: string;
  Count: number;
  uri: string;
  gender: string;
  prevCount?: number[] | undefined;
}

interface ResultScreenProps {
  finalTreeImageUri: string
  setIsDone: (doneStatus: boolean)=> void
  setIsShowResult: (showResultStatus: boolean)=> void
  setWholeData: (value: DataEntry[][]) => void;
  setData: (value: DataEntry[]) => void;
  setModalVisible: (visible: boolean) => void;
}

const ResultScreen:React.FC<ResultScreenProps> = ({
  finalTreeImageUri,
  setIsDone,
  setIsShowResult,
  setWholeData,
  setData,
  setModalVisible,
}) => {
  return (
    <View style={styles.resultContainer}>
      <Image
        source={{ uri: finalTreeImageUri }}
        resizeMode="contain"
        style={styles.treeImage}
      />
      <SaveResultComponent finalTreeImageUri={finalTreeImageUri} />
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => {
          const options = {
            url: finalTreeImageUri,
            message: 'Family tree image',
          };
          Share.open(options);
        }}
      >
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.startNewButton}
        onPress={() => {
          setIsDone(false);
          setIsShowResult(false);
          setWholeData([]);
          setData([]);
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Start New</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  treeImage: {
    width: '100%',
    height: '60%',
    marginBottom: 20,
    borderRadius: 10,
  },
  shareButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    width: '80%',
  },
  startNewButton: {
    backgroundColor: '#1034A6',
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 75,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResultScreen;
