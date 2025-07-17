// components/Upperbar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Upperbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.bar}>
      <Text style={styles.logo}>WorkBoard</Text>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="bell" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Help')}>
          <FontAwesome name="headphones" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    elevation: 5,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
});
