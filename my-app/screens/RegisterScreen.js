import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import config from '../Config';
import styles from '../css/RegisterScreeStyles';

const RegisterScreen = ({ navigation }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [pickupTime, setPickupTime] = useState(new Date().toISOString()); 

  const handleRegister = async () => {
    try {
      const response = await fetch(`${config.URL}/api/vehicle/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleNumber, phoneNumber, pickupTime }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Vehicle registered successfully');
        navigation.navigate('Search');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleVehicleNumberChange = (text, segment) => {
    let newValue = text.toUpperCase().replace(/[^A-Z0-9]/g, ''); 

    
    if (segment === 1) {
      newValue = newValue.slice(0, 2);
    } else if (segment === 2) {
      newValue = newValue.slice(0, 2);
    } else if (segment === 3) {
      newValue = newValue.slice(0, 2);
    } else if (segment === 4) {
      newValue = newValue.slice(0, 4);
    }

    setVehicleNumber(prev => {
      const parts = prev.split('-');
      parts[segment - 1] = newValue;
      return parts.join('-');
    });
  };

  
  const splitVehicleNumber = () => {
    const parts = vehicleNumber.split('-');
    return [
      parts[0] || '',
      parts[1] || '',
      parts[2] || '',
      parts[3] || '',
    ];
  };

  const [segment1, segment2, segment3, segment4] = splitVehicleNumber();

  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Register Vehicle</Text>
        <View style={styles.vehicleContainer}>
          <TextInput
            placeholder="XX"
            value={segment1}
            onChangeText={(text) => handleVehicleNumberChange(text, 1)}
            style={styles.vehicleInput}
            maxLength={2}
          />
          <TextInput
            placeholder="00"
            value={segment2}
            onChangeText={(text) => handleVehicleNumberChange(text, 2)}
            style={styles.vehicleInput}
            maxLength={2}
          />
          <TextInput
            placeholder="XX"
            value={segment3}
            onChangeText={(text) => handleVehicleNumberChange(text, 3)}
            style={styles.vehicleInput}
            maxLength={2}
          />
          <TextInput
            placeholder="0000"
            value={segment4}
            onChangeText={(text) => handleVehicleNumberChange(text, 4)}
            style={styles.vehicleInput}
            maxLength={4}
          />
        </View>
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Pickup Time"
          value={new Date(pickupTime).toLocaleString()} 
          onChangeText={(text) => setPickupTime(new Date(text).toISOString())}
          editable={false}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;
