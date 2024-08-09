import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../Config';
import styles from '../css/SignUpScreenStyles';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  
  const validatePassword = (password) => {
    const minLength = /(?=.{8,})/;
    const hasCapital = /(?=.*[A-Z])/;
    const hasNumber = /(?=.*\d)/;
    const hasSymbol = /(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/;

    if (!minLength.test(password)) return 'Password must be at least 8 characters long.';
    if (!hasCapital.test(password)) return 'Password must contain at least one capital letter.';
    if (!hasNumber.test(password)) return 'Password must contain at least one number.';
    if (!hasSymbol.test(password)) return 'Password must contain at least one special character.';

    return '';
  };


  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? '' : 'Invalid email address.';
  };

  const handleSignup = async () => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setEmailError(emailErr);
      setPasswordError(passErr);
      return;
    }

    try {
      const response = await fetch(`${config.URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        alert('User registered successfully');
        navigation.navigate('Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to Namma Metro</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(validateEmail(text));
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(validatePassword(text));
            }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#a21b8d" />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;
