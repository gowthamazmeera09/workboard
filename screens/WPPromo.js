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
        <Text style={styles.title}>Join And Earn Money Daily!</Text>
        <Text style={styles.description}>
          Are you looking for a part-time job with great opportunities? Become a part of our trusted network of workers in various fields. With flexible daily and monthly roles, you can connect with clients who need your expertise. Join us today and start earning by offering your skills in a reliable, professional environment.
        </Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>CLICK HERE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    maxWidth: 500,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e293b',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
