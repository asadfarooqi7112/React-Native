import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import DatePickerComponent from './DatePickerComponent'
import { storeData } from './AsyncStorageComponent';
import ToggleButtonComponent from './ToggleButtonComponent';

export default function InputCardComponent(props) {
    function handleAddReminder(){
        const newData = {Name:props.name,DOB:`${props.date.getMonth() + 1}/${props.date.getDate()}/${props.date.getFullYear()}`, reminderStatus: props.toggle}
        props.setAllData(prev=>{
            const updatedData = [...prev,newData]
            storeData('Birthdays-Data',updatedData)
            return updatedData
        });
        props.setShowInputCard(false)
    }

    function handleNameChange(Name){
        props.setName(Name)
    }

    function handleCancelReminder(){
        props.setShowInputCard(false)
        props.setName('')
        props.setDate(new Date())
    }

  return (
    <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.cancelAddReminder} onPress={handleCancelReminder}>
            <Text style={{color:'white'}}>X</Text>
        </TouchableOpacity>
        <View style={styles.nameFieldContainer}>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>Name:</Text>
            <TextInput maxLength={17} style={styles.nameField} value={props.name} onChangeText={handleNameChange} placeholder='Name'></TextInput>
        </View>
        <DatePickerComponent date = {props.date} setDate = {props.setDate}/>
        <View>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>Reminder:</Text>
            < ToggleButtonComponent toggle = {props.toggle} setToggle = {props.setToggle} />
        </View>   
        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
            <Text style={styles.buttontext}>Add Reminder</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        margin: 10,
        overflow: 'hidden',
        width: 300,
        padding: 20,
    },
    nameFieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        margin:-10,
    },
    nameField: {
        width: 180,
        borderWidth: 1,
        margin: 10,
        fontSize: 20,
        color: 'black',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
    },
    addButton: {
        backgroundColor: "#9C27B0",
        width: 160,
        height: 40,
        marginTop: 20,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    buttontext: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelAddReminder: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        left: 135,
        bottom: 18,
        backgroundColor: '#333333',
        width: 25,
        height: 25,
        borderRadius: 20,
    },

})