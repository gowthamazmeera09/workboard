import React, { useEffect } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Alert } from 'react-native';

export default function RazorpayScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { amount, userId, role } = route.params;

  useEffect(() => {
    const startPayment = () => {
      const options = {
        description: 'Payment to unlock contact',
        image: 'https://yourapp.com/logo.png', // optional
        currency: 'INR',
        key: 'rzp_live_OqzosWrCVboRcu', // ✅ Replace this with your real Razorpay key
        amount: amount * 100, // amount in paise
        name: 'WorkBoard',
        prefill: {
          email: 'user@example.com',
          contact: '9876543210',
        },
        theme: { color: '#3399cc' },
      };

      RazorpayCheckout.open(options)
        .then(async (data) => {
          const key = (amount === 90 ? `monthly_paid_${userId}_${role}` : `paid_${userId}_${role}`);
          await AsyncStorage.setItem(key, Date.now().toString());
          navigation.replace('UsersList', { role });
        })
        .catch((error) => {
          Alert.alert('Payment Failed', error.description || 'Payment was not completed.');
          navigation.goBack();
        });
    };

    startPayment();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}
