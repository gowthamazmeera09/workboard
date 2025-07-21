import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Linking
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation, useIsFocused } from '@react-navigation/native';
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
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function UsersList({ route }) {
  const { role } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [users, setUsers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [unlockedUsers, setUnlockedUsers] = useState({});
  const [userAttendance, setUserAttendance] = useState({});
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

  useEffect(() => {
    if (users.length > 0 && userLocation) {
      checkPayments();
    }
  }, [users, userLocation]);

  useEffect(() => {
    if (isFocused) checkPayments();
  }, [isFocused]);

  const checkPayments = async () => {
    const data = {};
    const attendanceData = {};

    for (const user of users) {
      const isMonthly = monthlyRoles.includes(role);
      const key = isMonthly
        ? `monthly_paid_${user._id}_${role}`
        : `paid_${user._id}_${role}`;

      const value = await AsyncStorage.getItem(key);
      const isPaid = value && Date.now() - parseInt(value) < (isMonthly ? 30 : 1) * 24 * 60 * 60 * 1000;
      if (isPaid) {
        data[user._id] = true;
      }

      if (isMonthly) {
        const currentKey = `attendance_${user._id}_${role}`;
        const lastKey = `last_attendance_${user._id}_${role}`;

        const attendanceValue = isPaid
          ? await AsyncStorage.getItem(currentKey)
          : await AsyncStorage.getItem(lastKey);

        const parsed = attendanceValue ? JSON.parse(attendanceValue) : [];
        attendanceData[user._id] = parsed.length;
      }
    }

    setUnlockedUsers(data);
    setUserAttendance(attendanceData);
  };

  const filteredUsers = users
    .filter(user => {
      if (!userLocation) return false;
      const dist = haversineDistance(user.location.coordinates, userLocation);
      return dist <= radius && user.addwork.some(work => work.role === role);
    })
    .map(user => ({
      ...user,
      distance: haversineDistance(user.location.coordinates, userLocation)
    }))
    .sort((a, b) => a.distance - b.distance);

  const handlePay = (userId, isMonthly) => {
    const amount = isMonthly ? 99 : 3;
    navigation.navigate('Razorpay', { amount, userId, isMonthly, role });
  };

  const renderUser = ({ item }) => {
    const work = item.addwork.find(w => w.role === role);
    const isMonthly = monthlyRoles.includes(role);
    const isUnlocked = unlockedUsers[item._id];

    const openAttendance = async () => {
      const paidTime = await AsyncStorage.getItem(`monthly_paid_${item._id}_${role}`);
      if (paidTime && Date.now() - parseInt(paidTime) < 30 * 24 * 60 * 60 * 1000) {
        navigation.navigate('Attendance', {
          userId: item._id,
          name: item.username || item.name,
          role,
        });
      } else {
        alert('Monthly payment required to access attendance.');
      }
    };

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            <TouchableOpacity onPress={() => setSelectedImage(item.photo)}>
              <Image
                source={{ uri: item.photo || 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{item.username}</Text>
            <Text style={styles.detail}>{item.distance.toFixed(1)} km away</Text>
            <Text style={styles.detail}>Experience: {work?.experience || 'N/A'}</Text>
          </View>

          <View style={styles.rightSection}>
            {isUnlocked ? (
              <View style={styles.iconGroup}>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:+91${item.phonenumber}`)}>
                  <Image source={require('../assets/phone.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
                  <Image source={require('../assets/email.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/91${item.phonenumber}`)}>
                  <Image source={require('../assets/whatapp.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.payBtn}
                onPress={() => handlePay(item._id, isMonthly)}
              >
                <Text style={styles.payText}>Pay ₹{isMonthly ? '99' : '3'} to Unlock</Text>
              </TouchableOpacity>
            )}

            {isMonthly && (
              <>
                <TouchableOpacity style={styles.attendanceBtn} onPress={openAttendance}>
                  <Text style={styles.attendanceText}>Attendance</Text>
                </TouchableOpacity>
                <Text style={styles.attendanceInfo}>
                  {unlockedUsers[item._id] ? 'Working Days' : 'Last Working Days'}: {userAttendance[item._id] || 0}
                </Text>
              </>
            )}
          </View>
        </View>

        {work?.photos?.length > 0 && (
          <View style={styles.photosSection}>
            <Text style={styles.photosTitle}>Previous Work</Text>
            <FlatList
              data={work.photos}
              horizontal
              keyExtractor={(uri, index) => `${uri}_${index}`}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedImage(item)}>
                  <Image source={{ uri: item }} style={styles.workImg} />
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6', // soft light background
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111827', // dark text
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFF8DC', // light gold
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#FFD700', // pure gold border
    shadowColor: '#FBBF24', // soft golden shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftSection: {
    width: '45%',
    alignItems: 'center',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 2,
    borderColor: '#9CA3AF', // subtle gray border
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827', // dark text
    textAlign: 'center',
  },
  detail: {
    fontSize: 13,
    color: '#6B7280', // secondary text
    marginTop: 4,
    textAlign: 'center',
  },

  rightSection: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#DCFCE7', // soft green
    borderRadius: 12,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#2563EB', // blue icon tint
  },

  payBtn: {
    backgroundColor: '#FACC15', // bright yellow
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  payText: {
    fontWeight: 'bold',
    color: '#1F2937', // almost black
    fontSize: 14,
  },

  attendanceBtn: {
    backgroundColor: '#4F46E5', // deep indigo
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
    width: '100%',
  },
  attendanceText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  attendanceInfo: {
    fontSize: 12,
    color: '#374151',
    marginTop: 6,
  },

  photosSection: {
    marginTop: 16,
  },
  photosTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  workImg: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  modal: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});
