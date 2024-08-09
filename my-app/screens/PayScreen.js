import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import config from '../Config';
import styles from '../css/PayScreenStyles';

const PayScreen = ({ route, navigation }) => {
  const { vehicleNumber, cost } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const fetchPhoneNumber = async () => {
    try {
      const response = await axios.get(`${config.URL}/api/vehicle/get-phone-number/${vehicleNumber}`);
      if (response.data) {
        setPhoneNumber(response.data.phoneNumber);
      } else {
        Alert.alert('Error', 'Failed to fetch phone number');
      }
    } catch (error) {
      console.error('Error fetching phone number:', error);
      Alert.alert('Error', 'An error occurred while fetching phone number.');
    }
  };

  const handleGeneratePaymentLink = async () => {
    await fetchPhoneNumber();

    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is not available.');
      return;
    }

    try {
      const response = await axios.post(`${config.URL}/api/payment/generate-payment-link`, {
        amount: cost,
        currency: 'INR',
        phone: phoneNumber,
        description: 'For metro parking charges',
      });
      const paymentLink = response.data.paymentLink;
      Alert.alert('Payment Link Generated', `Link: ${paymentLink}`);
    } catch (error) {
      console.error('Error generating payment link:', error);
      Alert.alert('Error', 'Failed to generate payment link');
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(`${config.URL}/api/vehicle/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleNumber }),
      });
      const data = await response.json();
      if (data.success) {
        setPaymentStatus('Payment Successful');
        Alert.alert('Payment Successful', 'The vehicle record has been deleted.');
        navigation.navigate('Search');
      } else {
        setPaymentStatus('Payment Failed');
        Alert.alert('Payment Failed', data.message || 'Failed to delete vehicle record.');
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus('Payment Error');
      Alert.alert('Payment Error', 'An error occurred while deleting the vehicle record.');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Payment Details</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>Vehicle Number: {vehicleNumber}</Text>
          <Text style={styles.detailText}>Cost: Rs.{cost}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGeneratePaymentLink}>
          <Text style={styles.buttonText}>Generate Payment Link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Confirm Payment</Text>
        </TouchableOpacity>
        {paymentStatus && <Text style={styles.statusText}>{paymentStatus}</Text>}
      </View>
    </ImageBackground>
  );
};

export default PayScreen;
