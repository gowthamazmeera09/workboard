import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Attendance() {
  const [hasMarkedToday, setHasMarkedToday] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [lastAttendance, setLastAttendance] = useState([]);
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const { userId, name, role } = route.params;
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadAttendance();
    checkPaymentStatus();
  }, []);

  const loadAttendance = async () => {
    const key = `attendance_${userId}_${role}`;
    const data = await AsyncStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : [];
    setAttendance(parsed);
    setHasMarkedToday(parsed.includes(today));
  };

  const checkPaymentStatus = async () => {
    const key = `monthly_paid_${userId}_${role}`;
    const paidTimeStr = await AsyncStorage.getItem(key);
    const paidTime = paidTimeStr ? parseInt(paidTimeStr) : null;

    const now = Date.now();
    const expired = !paidTime || now - paidTime >= 30 * 24 * 60 * 60 * 1000;

    if (!expired) {
      setIsPaymentActive(true);
    } else {
      setIsPaymentActive(false);

      // Store current attendance as last attendance and reset current
      const lastKey = `last_attendance_${userId}_${role}`;
      const attendanceKey = `attendance_${userId}_${role}`;
      const existing = await AsyncStorage.getItem(attendanceKey);
      if (existing) {
        await AsyncStorage.setItem(lastKey, existing);
      }
      await AsyncStorage.setItem(attendanceKey, JSON.stringify([]));
      setLastAttendance(JSON.parse(existing || '[]'));
      setAttendance([]);
    }

    // Load last attendance (to show after expiry)
    const lastStored = await AsyncStorage.getItem(`last_attendance_${userId}_${role}`);
    setLastAttendance(JSON.parse(lastStored || '[]'));
  };

  const markAttendance = async () => {
    if (hasMarkedToday) {
      Alert.alert("Already Marked", "You've already marked attendance today.");
      return;
    }

    const key = `attendance_${userId}_${role}`;
    const updated = [...attendance, today];
    await AsyncStorage.setItem(key, JSON.stringify(updated));
    setAttendance(updated);
    setHasMarkedToday(true);
    Alert.alert("Marked", "Attendance marked for today.");
  };

  const payMonthly = async () => {
    // Clear last attendance since new payment resets everything
    await AsyncStorage.removeItem(`last_attendance_${userId}_${role}`);
    await AsyncStorage.setItem(`monthly_paid_${userId}_${role}`, Date.now().toString());
    await AsyncStorage.setItem(`attendance_${userId}_${role}`, JSON.stringify([]));
    setAttendance([]);
    setLastAttendance([]);
    setIsPaymentActive(true);
    setHasMarkedToday(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Attendance - {name}</Text>

        {isPaymentActive ? (
          <>
            <Text style={styles.info}>🟢 Days Worked: {attendance.length}</Text>

            {hasMarkedToday ? (
              <Text style={styles.marked}>✅ Already marked today</Text>
            ) : (
              <TouchableOpacity style={styles.button} onPress={markAttendance}>
                <Text style={styles.buttonText}>Mark Attendance</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.subTitle}>🗓️ Past Attendance</Text>
            <View style={styles.history}>
              {attendance.slice().reverse().map((date, index) => (
                <Text key={index} style={styles.dateText}>• {date}</Text>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.warning}>🔒 Monthly payment required to mark attendance</Text>
            <TouchableOpacity style={styles.button} onPress={payMonthly}>
              <Text style={styles.buttonText}>Pay ₹99 to Unlock</Text>
            </TouchableOpacity>
            {lastAttendance.length > 0 && (
              <Text style={styles.lastInfo}>Last Working Days: {lastAttendance.length}</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F0F9FF',
  },
  card: {
    backgroundColor: '#E0F2FE',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  lastInfo: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 10,
  },
  marked: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 12,
  },
  warning: {
    fontSize: 16,
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0284C7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#0369A1',
  },
  history: {
    borderTopWidth: 1,
    borderColor: '#BAE6FD',
    paddingTop: 12,
  },
  dateText: {
    fontSize: 15,
    color: '#334155',
    paddingVertical: 4,
  },
});
