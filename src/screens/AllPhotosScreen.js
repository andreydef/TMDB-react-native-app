import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import Colors from '../constants/Colors';

import * as photosActions from '../store/actions/photos';

const AllPhotosScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [page, setPage] = useState(1);
  const photos = useSelector(state => state.photos.allPhotos);
  const dispatch = useDispatch();

  const loadPhotos = useCallback(async () => {
    setError(null);
    try {
      await dispatch(
        photosActions.fetchPhotos({ page: page, allPhotos: photos }),
      );
    } catch (err) {
      setError(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, setError]);

  useEffect(() => {
    loadPhotos().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPhotos]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured.</Text>
        <Button title="Try again" onPress={loadPhotos} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && photos?.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No posts found. Maybe start adding some!</Text>
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
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreData}
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
  },
  separator: {
    marginTop: 10,
  },
});

export default AllPhotosScreen;
