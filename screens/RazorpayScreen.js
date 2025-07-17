import React from 'react';
import { WebView } from 'react-native-webview';

export default function RazorpayScreen({ route, navigation }) {
  const { amount, userId } = route.params;

  const razorpayCheckoutHTML = `
    <html>
    <head>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body>
      <script>
        var options = {
          "key": "rzp_live_OqzosWrCVboRcu",
          "amount": ${amount} * 100,
          "currency": "INR",
          "name": "WorkBoard",
          "description": "Unlock contact",
          "image": "https://workboard.in/logo.png",
          "handler": function (response){
            window.ReactNativeWebView.postMessage("success");
          },
          "prefill": {
            "email": "test@example.com",
            "contact": "9999999999"
          },
          "theme": {
            "color": "#6D28D9"
          },
          "method": {
            "netbanking": true,
            "card": true,
            "upi": true,
            "wallet": true
          },
          "modal": {
            "ondismiss": function(){
              window.ReactNativeWebView.postMessage("cancel");
            }
          }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: razorpayCheckoutHTML }}
      onMessage={(event) => {
        if (event.nativeEvent.data === 'success') {
          navigation.goBack();
        }
      }}
    />
  );
}
