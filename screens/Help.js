// screens/Help.js
import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.subtext}>
        Tap any option below to reach out. We're here to assist you!
      </Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL('tel:+916303497101')}
        >
          <FontAwesome name="phone" size={32} color="#10b981" />
          <Text style={styles.cardLabel}>Call Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL('mailto:gowthamazmeera@gmail.com')}
        >
          <FontAwesome name="envelope" size={32} color="#3b82f6" />
          <Text style={styles.cardLabel}>Email Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL('https://wa.me/916303497101')}
        >
          <FontAwesome name="whatsapp" size={32} color="#22c55e" />
          <Text style={styles.cardLabel}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: '100%',
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 10,
  },
});
