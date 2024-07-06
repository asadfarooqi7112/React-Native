import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, Text, ScrollView, TouchableOpacity,View} from 'react-native';

import InputCardComponent from './components/InputCardComponent';
import CardsDisplayingComponent from './components/CardsDisplayingComponent';
import { getData } from './components/AsyncStorageComponent';
import PushNotificationComponent from './components/PushNotificationComponent';

import BootSplash from "react-native-bootsplash";

function App(): React.JSX.Element {

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('Birthdays-Data');
      setAllData(data);
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  const [showInputCard, setShowInputCard] = useState(false)
  const [toggle, setToggle] = useState(false);

  const [allData, setAllData] = useState([])

  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())

  function handleAddReminder(){
    setShowInputCard(true)
  }
  const arr = allData.map(((item,index)=><CardsDisplayingComponent key={index} id = {index} setAllData = {setAllData} name = {item.Name} DOB={item.DOB} toggle = {item.reminderStatus} setToggle = {setToggle}/>))
  console.log(allData)
  return (
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
      {arr}
      {showInputCard && 
      <InputCardComponent 
        name = {name}
        setName={setName}
        date = {date}
        setDate = {setDate}
        allData = {allData}
        setAllData = {setAllData}
        setShowInputCard = {setShowInputCard}
        toggle = {toggle}
        setToggle = {setToggle}
        />}
      <TouchableOpacity onPress={handleAddReminder} style={styles.addReminderButton}>
        <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
      <PushNotificationComponent allData = {allData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#faf3e0'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  addReminderButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9C27B0",
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: "bold",
  }
});

export default App;
