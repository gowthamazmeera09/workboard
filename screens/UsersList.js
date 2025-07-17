import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://workboard-backend.onrender.com/user/all-users';

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversineDistance(coord1, coord2) {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function UsersList({ route }) {
  const { role } = route.params;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const radius = 15;

  const monthlyRoles = ['watchman', 'driver', 'teacher', 'kidscaretaker', 'oldpeoplecaretaker'];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation([location.coords.longitude, location.coords.latitude]);
    })();
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  const filteredUsers = users.filter(user => {
    if (!userLocation) return false;
    const dist = haversineDistance(user.location.coordinates, userLocation);
    return dist <= radius && user.addwork.some(work => work.role === role);
  });

  const handlePay = (userId, isMonthly) => {
    const amount = isMonthly ? 99 : 3;
    navigation.navigate('Razorpay', { amount, userId, isMonthly });
  };

  const renderUser = ({ item }) => {
    const work = item.addwork.find(w => w.role === role);
    const isMonthly = monthlyRoles.includes(role);

    const openAttendance = async () => {
      const paidTime = await AsyncStorage.getItem(`monthly_paid_${item._id}`);
      if (paidTime && Date.now() - parseInt(paidTime) < 30 * 24 * 60 * 60 * 1000) {
        navigation.navigate('Attendance', { userId: item._id });
      } else {
        alert('Monthly payment required to access attendance.');
      }
    };

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setSelectedImage(item.photo)}>
          <Image source={{ uri: item.photo }} style={styles.avatar} />
        </TouchableOpacity>

        <Text style={styles.username}>{item.username}</Text>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => handlePay(item._id, isMonthly)}
        >
          <Text style={styles.payText}>
            Pay ₹{isMonthly ? '99' : '3'} to Unlock
          </Text>
        </TouchableOpacity>

        {isMonthly && (
          <TouchableOpacity style={styles.attendanceButton} onPress={openAttendance}>
            <Text style={styles.attendanceText}>Open Attendance</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Experience: {work?.experience || 'N/A'}</Text>

        {work?.photos && work.photos.length > 0 && (
          <View style={styles.photosContainer}>
            <Text style={styles.label}>Previous Work:</Text>
            <FlatList
              data={work.photos}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(uri, index) => `${uri}_${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedImage(item)}>
                  <Image source={{ uri: item }} style={styles.workImage} />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Workers for: {role}</Text>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Modal visible={!!selectedImage} transparent onRequestClose={() => setSelectedImage(null)}>
        <TouchableOpacity style={styles.modal} onPress={() => setSelectedImage(null)}>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#e5e5f7',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  username: { fontSize: 18, fontWeight: '600', marginTop: 8 },
  payButton: {
    backgroundColor: '#facc15',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  payText: { fontWeight: 'bold', color: '#000' },
  label: { marginTop: 10, fontSize: 14 },
  photosContainer: { marginTop: 10 },
  workImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  attendanceButton: {
    backgroundColor: '#6D28D9',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  attendanceText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  modal: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullImage: { width: '90%', height: '80%', resizeMode: 'contain' },
});
