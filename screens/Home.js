import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import mason from '../assets/uimason.jpg';
import painter from '../assets/uipainter.jpg';
import plumber from '../assets/uiplumber.jpg';
import electrician from '../assets/uielectrician.jpg';
import carpenter from '../assets/uicarpenter.jpg';
import welder from '../assets/uiwelder.jpg';
import automechanic from '../assets/automechanic.jpg';
import bikemechanic from '../assets/bikemechanic.jpg';
import Carmechanic from '../assets/carmechanic.jpg';
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

export default function Home() {
  const navigation = useNavigation();
  const [visibleRoles, setVisibleRoles] = useState(8);

  const roles = [
    { name: 'mason', image: mason },
    { name: 'painter', image: painter },
    { name: 'plumber', image: plumber },
    { name: 'electrician', image: electrician },
    { name: 'carpenter', image: carpenter },
    { name: 'welder', image: welder },
    { name: 'automechanic', image: automechanic },
    { name: 'bikemechanic', image: bikemechanic },
    { name: 'carmechanic', image: Carmechanic },
    { name: 'carwash', image: carwash },
    { name: 'chef', image: chef },
    { name: 'Dhobi', image: cloths },
    { name: 'gardener', image: garden },
    { name: 'glasscleaner', image: glass },
    { name: 'kidscaretaker', image: kids },
    { name: 'oldpeoplecaretaker', image: old },
    { name: 'photographer', image: photographer },
    { name: 'makeupartest', image: makeup },
    { name: 'cattering', image: cattering },
    { name: 'dishwasher', image: dishes },
    { name:'AcTech', image:ac }
    // add more later
  ];

  const showMore = () => {
    setVisibleRoles((prev) => prev + 4);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('UsersList', { role: item.name })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.roleName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Workers</Text>
      <FlatList
        data={roles.slice(0, visibleRoles)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
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
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
  },
  card: {
    width: '45%',
    margin: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  roleName: {
    padding: 8,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});