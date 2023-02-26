import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllFavoritesScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>AllFavoritesScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllFavoritesScreen;
