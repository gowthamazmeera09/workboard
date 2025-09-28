// screens/RazorpayScreen.js
import React from 'react';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RazorpayScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { amount, userId, isMonthly, role, redirectTo } = route.params; // 👈 role and redirectTo included

  const finalAmount = amount * 100;

  const razorpayCheckoutHTML = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body onload="payNow()">
        <script>
          function payNow() {
            var options = {
              key: "rzp_live_OqzosWrCVboRcu",
              amount: "${finalAmount}",
              currency: "INR",
              name: "WorkBoard",
              description: "Payment to unlock contact or mark attendance",
              image: "https://your-logo-url.com/logo.png",
              handler: function (response) {
                window.ReactNativeWebView.postMessage("success");
              },
              prefill: {
                email: "demo@demo.com",
                contact: "9999999999"
              },
              theme: {
                color: "#6D28D9"
              }
            };
            var rzp = new Razorpay(options);
            rzp.open();
          }
        </script>
      </body>
    </html>
  `;

  const handleMessage = async (event) => {
    if (event.nativeEvent.data === 'success') {
      const key = isMonthly
        ? `monthly_paid_${userId}_${role}`
        : `paid_${userId}_${role}`;

      await AsyncStorage.setItem(key, Date.now().toString());

      // 👇 Redirect based on context
      if (redirectTo === 'Attendance') {
        navigation.navigate('Attendance', { userId });
      } else {
        navigation.navigate('UsersList', { role });
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: razorpayCheckoutHTML }}
        onMessage={handleMessage}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#6D28D9"
            style={{ flex: 1, justifyContent: 'center' }}
          />
        )}
      />
    </View>
  );
}
