import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

const ItemCardScreen = ({ route }) => {
  const { photo } = route.params;
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${photo?.poster_path}`,
            }}
            onLoad={() => setIsImageLoading(false)}
          />
          {isImageLoading && <ActivityIndicator size="large" />}
          {/* Title */}
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Title</Text>
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{photo?.title}</Text>
          </View>
          {/* Overview */}
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Overview</Text>
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{photo?.overview}</Text>
          </View>
          {/* Popularity */}
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Popularity</Text>
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{photo?.popularity}</Text>
          </View>
          {/* Vote average */}
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Vote average</Text>
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{photo?.vote_average}</Text>
          </View>
          {/* Vote count */}
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Vote count</Text>
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{photo?.vote_count}</Text>
          </View>
          {/* Release date */}
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Release date</Text>
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{photo?.release_date}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  card: {
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  cardHeader: {
    paddingTop: 17,
    paddingBottom: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 275,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    flex: 1,
    fontWeight: 600,
    color: 'black',
  },
});

export default ItemCardScreen;
