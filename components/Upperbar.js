import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Upperbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.bar}>
      <Text style={styles.logo}>
        <Text style={styles.logoHighlight}>Work</Text>Board
      </Text>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="bell" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Help')}>
          <FontAwesome name="headphones" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 20 : 14,
    backgroundColor: '#0f172a', // Deep blue
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  logoHighlight: {
    color: '#38bdf8', // Light blue accent
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 50,
  },
});
