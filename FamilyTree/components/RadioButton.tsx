import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioButtonProps{
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

const RadioButton:React.FC<RadioButtonProps> = ({ label, value, selected, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(value)} style={styles.container}>
      <View style={styles.outerCircle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
});

export default RadioButton;
