import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

export default function ToggleButtonComponent(props) {
    console.log(props.id)
    console.log(props.id?"yes":"no")

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: props.toggle ? 20 : -22,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [props.toggle]);

  function handleToggle() {
    if (props.id !== undefined) {
      props.setAllData(prev => 
        prev.map((item, index) => 
          index === props.id ? { ...item, reminderStatus: !item.reminderStatus } : item
        )
      );
    }
    else{
        props.setToggle(prev => !prev);
    }
  }

  return (
    <TouchableOpacity
      style={styles.toggleContainer}
      onPress={handleToggle}
      accessible={true}
      accessibilityLabel="Toggle button"
      accessibilityHint="Toggles between on and off states"
      accessibilityState={{ selected: props.toggle }}
    >
        <Text style={[styles.toggleText, styles.textOff]}>Off</Text>
        <Animated.View style={[styles.toggleCircle, { transform: [{ translateX }],backgroundColor: props.toggle ? '#3CB371' : 'red', }]} />
        <Text style={[styles.toggleText, styles.textOn]}>On</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    width: 80,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'lightblue'
  },
  toggleCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  textOn: {
    color: '#3CB371', 
    marginLeft: -5,
  },
  textOff: {
    color: '#FF6347',
    marginRight: -5,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
