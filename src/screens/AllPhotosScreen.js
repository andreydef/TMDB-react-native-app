import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';

import * as photosActions from '../store/actions/photos';
import { filterUniqueValues } from '../helpers/index';

const AllPhotosScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [page, setPage] = useState(1);
  const photos = useSelector(state => state.photos.allPhotos);
  const dispatch = useDispatch();

  const [searchPhotos, setSearchPhotos] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(photos || []);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const loadPhotos = useCallback(async () => {
    setError(null);
    try {
      await dispatch(
        photosActions.fetchPhotos({ page: page, allPhotos: photos }),
      );
      setFilteredDataSource(photos);
      setMasterDataSource(photos);
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
    if (!searchPhotos?.length) {
      setPage(page + 1);
    }
  };

  const updateSearch = text => {
    setSearchPhotos(text);
    if (text) {
      const newData = photos.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const uniqueValues = filterUniqueValues(newData);
      setFilteredDataSource(uniqueValues);
      setSearchPhotos(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchPhotos(text);
    }
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

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={text => updateSearch(text)}
          onClear={() => setSearchPhotos('')}
          value={searchPhotos}
        />
      </View>
      <FlatList
        style={styles.list}
        data={filteredDataSource}
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
