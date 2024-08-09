import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import config from '../Config';
import styles from '../css/SearchScreenStyles';

const SearchScreen = ({ navigation }) => {
  const [vehicleNumber, setVehicleNumber] = useState({
    part1: '',
    part2: '',
    part3: '',
    part4: '',
  });
  const [dropoffTime, setDropoffTime] = useState(new Date().toISOString()); 
  const [result, setResult] = useState(null);

  const resetForm = () => {
    setVehicleNumber({
      part1: '',
      part2: '',
      part3: '',
      part4: '',
    });
    setDropoffTime(new Date().toISOString());
    setResult(null);
  };

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [])
  );

  const handleSearch = async () => {
    const formattedVehicleNumber = `${vehicleNumber.part1}-${vehicleNumber.part2}-${vehicleNumber.part3}-${vehicleNumber.part4}`;
    try {
      const response = await fetch(`${config.URL}/api/vehicle/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleNumber: formattedVehicleNumber, dropoffTime }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handlePay = () => {
    navigation.navigate('Pay', {
      vehicleNumber: result.vehicle.vehicleNumber,
      cost: result.parking.cost,
     
    });
  };

  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Search Vehicle</Text>
        <View style={styles.vehicleNumberContainer}>
          <TextInput
            placeholder="XX"
            value={vehicleNumber.part1}
            onChangeText={(text) => setVehicleNumber((prev) => ({ ...prev, part1: text.toUpperCase() }))}
            maxLength={2}
            style={styles.vehicleInput}
          />
          <TextInput
            placeholder="00"
            value={vehicleNumber.part2}
            onChangeText={(text) => setVehicleNumber((prev) => ({ ...prev, part2: text.toUpperCase() }))}
            maxLength={2}
            style={styles.vehicleInput}
          />
          <TextInput
            placeholder="XX"
            value={vehicleNumber.part3}
            onChangeText={(text) => setVehicleNumber((prev) => ({ ...prev, part3: text.toUpperCase() }))}
            maxLength={2}
            style={styles.vehicleInput}
          />
          <TextInput
            placeholder="0000"
            value={vehicleNumber.part4}
            onChangeText={(text) => setVehicleNumber((prev) => ({ ...prev, part4: text.toUpperCase() }))}
            maxLength={4}
            style={styles.vehicleInput}
          />
        </View>
        <TextInput
          placeholder="Pickup Time"
          value={new Date(dropoffTime).toLocaleString()} 
          onChangeText={(text) => setDropoffTime(new Date(text).toISOString())} 
          editable={false}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        {result && (
          <View style={styles.resultContainer}>
            <Text>Vehicle Number: {result.vehicle.vehicleNumber}</Text>
            <Text>Pickup Time: {new Date(result.parking.pickupTime).toLocaleString()}</Text>
            <Text>Cost: Rs.{result.parking.cost || 'N/A'}</Text>
            {result.parking.cost && (
              <TouchableOpacity style={styles.button1} onPress={handlePay}>
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleNavigateToRegister}>
          <Text style={styles.buttonText}>Register New Vehicle</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SearchScreen;
