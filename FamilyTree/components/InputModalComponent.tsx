import ImagePickerComponent from './ImagePickerComponent';
import RadioButton from './RadioButton';

import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

interface InputModalComponentProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  name: string;
  setName: (name: string) => void;
  dob: string;
  setDob: (dob: string) => void;
  dod: string;
  setDod: (dod: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  setNodeImageUri: (uri: string) => void;
  handleAdd: () => void;
}

const InputModalComponent:React.FC<InputModalComponentProps> = (props)=> {

    const radioButtons = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ];

    function handleNameChange(text: string){
        props.setName(text);
      }
      function handleDobChange(text: string){
        props.setDob(text);
      }
      function handleDodChange(text: string){
        props.setDod(text);
      }



  return (
<Modal
        animationType="slide" // Set animation type
        transparent={true} // Set transparent background
        visible={props.modalVisible} // Set modal visibility
        onRequestClose={() => {
          // Handle modal close
          props.setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={{backgroundColor:"white", padding: 20}}>
            
          <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeModal} onPress={()=>{props.setModalVisible(false)}}>
            <Text style={styles.closeModalText}>X</Text>
          </TouchableOpacity>
            <TextInput style={styles.inputBox}  placeholderTextColor="#888" onChangeText={handleNameChange} placeholder='Name*' value={props.name}></TextInput>
            <TextInput style={styles.inputBox}  placeholderTextColor="#888" onChangeText={handleDobChange} placeholder='DOB*' value={props.dob}></TextInput>
            <TextInput style={styles.inputBox}  placeholderTextColor="#888" onChangeText={handleDodChange} placeholder='DOD' value={props.dod}></TextInput>
            <View style={styles.radioContainer}>
              {radioButtons.map((radio, index) => (
                <RadioButton
                  key={index}
                  label={radio.label}
                  value={radio.value}
                  selected={radio.value === props.selectedGender}
                  onSelect={props.setSelectedGender}
                />
              ))}
            </View>
            <ImagePickerComponent setNodeImageUri={props.setNodeImageUri} />
          </View>
          <TouchableOpacity style={styles.addButtonModel} onPress={props.handleAdd}>
              <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        elevation: 5,
        width: 300,
        alignItems: 'center',
        marginBottom:20
      },
      inputBox: {
        width: 250,
        borderWidth: 1,
        margin: 10,
        color: 'black',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
    
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      radioContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        padding: 10
      },
      addButtonModel: {
        backgroundColor: '#1034A6', // Green color as an example
        paddingHorizontal: 80,
        paddingVertical:10,
        borderRadius: 8,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 3, // for Android shadow
      },
      closeModal: {
        position: 'relative',
        bottom: 12,
        left:142,
        backgroundColor: "#ff5c5c",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // For Android shadow
        margin: -10
      },
      closeModalText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 30,
      },
    
     
})


export default InputModalComponent;