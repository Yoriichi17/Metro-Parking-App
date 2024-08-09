import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import SearchScreen from './screens/SearchScreen';
import RegisterScreen from './screens/RegisterScreen';
import PayScreen from './screens/PayScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
