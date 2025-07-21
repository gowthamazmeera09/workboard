import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// Import images
import driver from '../assets/driver.jpeg';
import teacher from '../assets/teacher.jpeg';
import watchman from '../assets/watchmen.jpeg';
import kids from '../assets/kidscaretaker.jpg';
import old from '../assets/oldpeoplecaretaker.jpg';

const screenWidth = Dimensions.get('window').width;

export default function MonthlyWorkers() {
  const navigation = useNavigation();
  const [visibleRoles, setVisibleRoles] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

  const allRoles = [
    { name: 'Watchman', image: watchman },
    { name: 'Driver', image: driver },
    { name: 'Teacher', image: teacher },
    { name: 'Kids Caretaker', image: kids },
    { name: 'Elderly Care', image: old },
  ];

  const filteredRoles = allRoles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showMore = () => {
    setVisibleRoles(prev => prev + 2);
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} useNativeDriver>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('UsersList', { role: item.name.toLowerCase() })}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Monthly Workers</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search roles (e.g., driver)"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredRoles.slice(0, visibleRoles)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />

      {visibleRoles < filteredRoles.length && (
        <TouchableOpacity style={styles.button} onPress={showMore}>
          <Text style={styles.buttonText}>Show More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: screenWidth * 0.44,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  name: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 40,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
