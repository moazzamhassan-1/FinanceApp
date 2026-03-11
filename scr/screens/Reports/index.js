// screens/StatisticsScreen/index.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Summary</Text>
        {/* Add your statistics content here */}
      </View>
    </View>
  );
};

export default StatisticsScreen;
