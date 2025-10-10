import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
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

const { width } = Dimensions.get('window');
const images = [mason, electrician, teacher, driver,painter,plumber,carpenter,welder,automechanic,bikemechanic,carmechanic,carwash,
  chef,cloths,garden,glass,kids,old,makeup,photographer,cattering,dishes,ac];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <Image source={images[index]} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: width,
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});