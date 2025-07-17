// screens/Attendance.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Attendance = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [hasMarkedToday, setHasMarkedToday] = useState(false);
  const [today, setToday] = useState('');

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    setToday(currentDate);
    checkAttendance(currentDate);
  }, []);

  const checkAttendance = async (date) => {
    const data = await AsyncStorage.getItem('attendance');
    const attendanceData = data ? JSON.parse(data) : {};
    if (attendanceData[date]) {
      setHasMarkedToday(true);
    }
  };

  const markAttendance = async () => {
    if (hasMarkedToday) {
      Alert.alert("Already Marked", "You've already marked attendance today.");
      return;
    }

    // Simulate ₹3 payment success (you can link Razorpay later)
    Alert.alert("₹3 Payment", "Successfully paid ₹3 for attendance.");

    const data = await AsyncStorage.getItem('attendance');
    const attendanceData = data ? JSON.parse(data) : {};
    attendanceData[today] = true;

    await AsyncStorage.setItem('attendance', JSON.stringify(attendanceData));
    setHasMarkedToday(true);
  };

  const payMonthly = () => {
    // Simulate ₹99 payment
    Alert.alert("₹99 Monthly Payment", "Monthly payment successful!");
    setIsPaid(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance for {today}</Text>

      {isPaid ? (
        <>
          <Text style={styles.info}>Monthly Plan Active</Text>
          <Button
            title={hasMarkedToday ? "Already Marked" : "Mark Attendance"}
            onPress={markAttendance}
            disabled={hasMarkedToday}
          />
        </>
      ) : (
        <>
          <Text style={styles.info}>₹3 will be charged per attendance</Text>
          <Button title="Mark Attendance (₹3)" onPress={markAttendance} disabled={hasMarkedToday} />
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.info}>OR</Text>
          </View>
          <Button title="Pay ₹99 Monthly" onPress={payMonthly} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  }
});

export default Attendance;
