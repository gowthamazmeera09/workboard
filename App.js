import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './screens/LandingPage';
import Home from './screens/Home';
import UsersList from './screens/UsersList';
import Help from './screens/Help';
import Profile from './screens/Profile';
import RazorpayScreen from './screens/RazorpayScreen';
import Attendance from './screens/Attendance';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UsersList" component={UsersList} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Razorpay" component={RazorpayScreen} />
        <Stack.Screen name="Attendance" component={Attendance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}