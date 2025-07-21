// components/WPPromo.js
import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';

export default function WPPromo() {
  const handlePress = () => {
    Linking.openURL('https://www.workerboard.work/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>💼 Join & Earn Money Daily!</Text>
        <Text style={styles.description}>
          Looking for flexible work with real earnings? Join our trusted worker network and get hired for daily or monthly roles. Provide your skills, build your profile, and connect with real clients. Start today and secure daily income from verified opportunities!
        </Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>🚀 START NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFBEB', // soft gold-beige background
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#FFF8DC', // light gold card
    borderRadius: 20,
    padding: 24,
    shadowColor: '#FFD700',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
    width: '100%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 14,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E40AF', // deep blue
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
