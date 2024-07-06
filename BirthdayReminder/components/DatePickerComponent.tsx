import { StyleSheet, View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'

import DatePicker from 'react-native-date-picker'

export default function DatePickerComponent(props) {
    const [open, setOpen] = useState(false)
    console.log(props.date.getDate())

  return (
    <View style={styles.dateContainer}>
        <View style={styles.dataFieldContainer}>
            <Text style={{fontSize:20,fontWeight:'bold', color:'black'}}>Date of Birth:</Text>
            <Text 
                style={styles.dateField} 
                onPress={() => setOpen(true)}
                >
                    {`${props.date.getMonth() + 1}/${props.date.getDate()}/${props.date.getFullYear()}`}
            </Text>
        </View>
        <DatePicker
                    modal
                    mode='date'
                    open={open}
                    date={props.date}
                    onConfirm={(date) => {
                    setOpen(false)
                    props.setDate(date)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
                />
    </View>
  )
}

const styles = StyleSheet.create({
    dateContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    dataFieldContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    dateField: {


        width: 120,
        borderWidth: 1,
        margin: 10,
        fontSize: 20,
        color: 'black',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
    }
})