import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import mason from '../assets/uimason.jpg';
import electrician from '../assets/uielectrician.jpg';
import teacher from '../assets/uiteacher.jpg';
import driver from '../assets/uidriver.jpg';

const { width } = Dimensions.get('window');
const images = [mason, electrician, teacher, driver];

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