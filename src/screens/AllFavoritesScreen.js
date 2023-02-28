import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import Card from '../components/UI/Card';

const AllFavoritesScreen = props => {
  const photos = useSelector(state => state.photos.favoritesPhotos);

  if (photos?.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No favorite photos found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        data={photos}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={photo => {
          return <Card photo={photo.item} />;
        }}
        initialNumToRender={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    marginTop: Platform.OS === 'android' ? 0 : 80,
  },
  separator: {
    marginTop: 10,
  },
});

export default AllFavoritesScreen;
