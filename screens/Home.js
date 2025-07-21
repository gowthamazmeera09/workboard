import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// Import images
import mason from '../assets/uimason.jpg';
import painter from '../assets/uipainter.jpg';
import plumber from '../assets/uiplumber.jpg';
import electrician from '../assets/uielectrician.jpg';
import carpenter from '../assets/uicarpenter.jpg';
import welder from '../assets/uiwelder.jpg';
import automechanic from '../assets/automechanic.jpg';
import bikemechanic from '../assets/bikemechanic.jpg';
import carmechanic from '../assets/carmechanic.jpg';
import carwash from '../assets/carwasher.jpeg';
import chef from '../assets/chief.jpg';
import cloths from '../assets/clothswasher.jpg';
import garden from '../assets/gardencleaner.jpg';
import glass from '../assets/glasscleaner.jpg';
import kids from '../assets/kidscaretaker.jpg';
import old from '../assets/oldpeoplecaretaker.jpg';
import makeup from '../assets/makeupartest 2.jpg';
import photographer from '../assets/photographer.jpg';
import cattering from '../assets/waiter.jpg';
import dishes from '../assets/washingdishes.jpg';
import ac from '../assets/uiAcTech.jpg';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const navigation = useNavigation();
  const [visibleRoles, setVisibleRoles] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');

  const allRoles = [
    { name: 'Mason', image: mason },
    { name: 'Painter', image: painter },
    { name: 'Plumber', image: plumber },
    { name: 'Electrician', image: electrician },
    { name: 'Carpenter', image: carpenter },
    { name: 'Welder', image: welder },
    { name: 'Auto Mechanic', image: automechanic },
    { name: 'Bike Mechanic', image: bikemechanic },
    { name: 'Car Mechanic', image: carmechanic },
    { name: 'Car Wash', image: carwash },
    { name: 'Chef', image: chef },
    { name: 'Dhobi', image: cloths },
    { name: 'Gardener', image: garden },
    { name: 'Glass Cleaner', image: glass },
    { name: 'Kids Caretaker', image: kids },
    { name: 'Elderly Care', image: old },
    { name: 'Photographer', image: photographer },
    { name: 'Makeup Artist', image: makeup },
    { name: 'Catering', image: cattering },
    { name: 'Dishwasher', image: dishes },
    { name: 'AC Technician', image: ac },
  ];

  const filteredRoles = allRoles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showMore = () => {
    setVisibleRoles(prev => prev + 4);
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} useNativeDriver>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('UsersList', { role: item.name.toLowerCase() })}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.roleName}>{item.name}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Explore Workers</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search roles (e.g., plumber)"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredRoles.slice(0, visibleRoles)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
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
    paddingTop: 2,
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
  },
  image: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  roleName: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
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
