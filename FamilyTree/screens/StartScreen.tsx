// components/StartScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface StartScreenProps {
    handleStart: () => void;

}

const StartScreen:React.FC<StartScreenProps> = ({ handleStart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.introText}>
        Press the button and start making your family tree.
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5F5F5",
  },
  introText: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: "#1034A6",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StartScreen;
