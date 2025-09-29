// screens/RazorpayScreen.js
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RazorpayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, userId, isMonthly, role, redirectTo } = route.params || {};

  useEffect(() => {
    if (!amount) return;

    const options = {
      description: isMonthly
        ? 'Monthly Worker Subscription'
        : 'Daily Worker Contact Unlock',
      image: 'https://your-logo-url.com/logo.png',
      currency: 'INR',
      key: 'rzp_live_OqzosWrCVboRcu', // 🔑 replace with your Razorpay key
      amount: amount * 100, // Razorpay expects paise
      name: 'WorkBoard',
      prefill: {
        email: 'demo@demo.com',
        contact: '9999999999',
        name: 'WorkBoard User',
      },
      theme: { color: '#6D28D9' },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        try {
          const key = isMonthly
            ? `monthly_paid_${userId}_${role}`
            : `paid_${userId}_${role}`;

          await AsyncStorage.setItem(key, Date.now().toString());

          Alert.alert('Success', 'Payment Successful ✅');

          // 🔄 Redirect after payment
          if (redirectTo === 'Attendance') {
            navigation.navigate('Attendance', { userId });
          } else {
            navigation.navigate('UsersList', { role });
          }
        } catch (err) {
          console.log('Storage error:', err);
        }
      })
      .catch((error) => {
        Alert.alert('Payment Failed ❌', error.description || 'Try again later');
        navigation.goBack();
      });
  }, []);

  return null; // Razorpay opens modal, nothing to render
}
