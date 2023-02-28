import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import { setPhotoLike, removePhotoLike } from '../../store/actions/photos';
import { filterUniqueValues } from '../../helpers/index';

const Card = props => {
  const { photo } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const allPhotos = useSelector(state => state.photos.allPhotos);
  const favoritesPhotos = useSelector(state => state.photos.favoritesPhotos);

  const addToFavoritesList = item => dispatch(setPhotoLike(item));
  const removeFromFavoritesList = item => dispatch(removePhotoLike(item));

  const ifExists = item => {
    if (
      favoritesPhotos.filter(favoritePhoto => favoritePhoto?.id === item?.id)
        .length > 0
    ) {
      return true;
    }

    return false;
  };

  const changeLikeField = likeState => {
    const filteredData = filterUniqueValues(allPhotos);
    const photoItem = filteredData.filter(
      allPhoto => allPhoto?.id === photo?.id,
    )[0];
    photoItem.like = likeState;

    const originalObject = allPhotos.find(obj => obj?.id === photoItem?.id);
    Object.assign(originalObject, photoItem);
  };

  const onPressLike = item => {
    if (!ifExists(item)) {
      addToFavoritesList(item);
      changeLikeField(true);
    } else {
      removeFromFavoritesList(item);
      changeLikeField(false);
    }
  };

  return (
    <View style={styles.screen}>
      <TouchableHighlight
        style={styles.socialBarButton}
        onPress={() =>
          navigation.navigate('ItemCard', {
            photo: photo,
            name: photo?.title,
          })
        }>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${photo?.poster_path}`,
            }}
          />
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.title}>{photo?.title}</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.socialBarContainer}>
              <View style={styles.socialBarSection}>
                <TouchableOpacity style={styles.socialBarButton}>
                  <FontAwesomeIcons
                    onPress={() => onPressLike(photo)}
                    name={photo?.like ? 'heart' : 'heart-o'}
                    color="#000"
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    elevation: 4,
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooter: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardImage: {
    flex: 1,
    height: 275,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  /******** social bar ******************/
  socialBarContainer: {
    flexDirection: 'row',
  },
  socialBarSection: {
    marginRight: 20,
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
