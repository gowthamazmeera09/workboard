import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import driver from '../assets/driver.jpeg';
import teacher from '../assets/teacher.jpeg';
import watchman from '../assets/watchmen.jpeg';
import kids from '../assets/kidscaretaker.jpg';
import old from '../assets/oldpeoplecaretaker.jpg';

export default function MonthlyWorkers() {
  const navigation = useNavigation();
  const [visibleRoles, setVisibleRoles] = useState(4);

  const roles = [
    { name: 'watchman', image: watchman },
    { name: 'driver', image: driver },
    { name: 'teacher', image: teacher },
    { name: 'kidscaretaker', image: kids },
    { name: 'oldpeoplecaretaker', image: old },
  ];

  const showMore = () => {
    setVisibleRoles((prev) => prev + 4);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Workers</Text>
      <FlatList
        data={roles.slice(0, visibleRoles)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UsersList', { role: item.name })}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      {visibleRoles < roles.length && (
        <TouchableOpacity style={styles.button} onPress={showMore}>
          <Text style={styles.buttonText}>Show More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
  },
  name: {
    padding: 10,
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  list: {
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});