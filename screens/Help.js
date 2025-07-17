// screens/Help.js
import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtext}>
        If you have any questions or need assistance, feel free to reach out to us:
      </Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => Linking.openURL('tel:+916303497101')} style={styles.iconWrapper}>
          <FontAwesome name="phone" size={40} color="#22c55e" />
          <Text style={styles.label}>Call Us</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('mailto:gowthamazmeera@gmail.com')} style={styles.iconWrapper}>
          <FontAwesome name="envelope" size={40} color="#3b82f6" />
          <Text style={styles.label}>Email Us</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+916303497101')} style={styles.iconWrapper}>
          <FontAwesome name="whatsapp" size={40} color="#22c55e" />
          <Text style={styles.label}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtext: { textAlign: 'center', marginBottom: 20, color: '#6b7280' },
  row: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  iconWrapper: { alignItems: 'center', marginHorizontal: 10 },
  label: { marginTop: 6, fontSize: 14, fontWeight: '600' },
});
