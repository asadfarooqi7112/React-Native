import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

import { storeData } from './AsyncStorageComponent'
import ToggleButtonComponent from './ToggleButtonComponent'

export default function CardsDisplayingComponent(props) {

    function handleRemoveReminder(){
        props.setAllData(prev=>{
            const updatedData = prev.filter((item,index)=>index!==props.id)
            storeData('Birthdays-Data', updatedData);
            return updatedData;
        })
    }

  return (
    <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.removeReminderBtn} onPress={handleRemoveReminder}>
            <Text style={{color:'white'}}>X</Text>
        </TouchableOpacity>
        <View style={styles.fieldsContainer}>
            <View style={styles.nameFieldContainer}>
                <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>Name: </Text>
                <Text  style={{fontSize:20, color:'black'}}>{props.name}</Text>
            </View>
            <View style={styles.nameFieldContainer}>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>Date of Birth: </Text>
            <Text  style={{fontSize:20, color:'black'}}>{props.DOB}</Text>
            </View>
            <View style={styles.nameFieldContainer}>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>Reminder: </Text>
            <ToggleButtonComponent toggle={props.toggle} setToggle = {props.setToggle} id = {props.id} setAllData={props.setAllData}/>
            </View>
        </View>
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
        paddingBottom: 25,
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        margin:-10,
    },
    nameFieldContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",

    },
    removeReminderBtn: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        left: 135,
        bottom: -2,
        backgroundColor: '#333333',
        width: 25,
        height: 25,
        borderRadius: 20,
    },
   
})