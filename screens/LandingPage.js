import React, { useState } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import Upperbar from '../components/Upperbar';
import Carousel from './Carousel';
import MonthlyWorkers from './MonthlyWorkers';
import Home from './Home';
import WPPromo from './WPPromo';

export default function LandingPage() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulate refresh
  };

  const data = [{}]; // dummy data to render

  const renderItem = () => (

























































































    
    <View>
      <Upperbar />
      <Carousel />
      <Home />
      <MonthlyWorkers />
      <WPPromo />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}