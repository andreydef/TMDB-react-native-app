import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = props => {
  const { photo } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <TouchableOpacity
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
                  <Text style={styles.socialBarLabel}>
                    {' '}
                    {photo?.likes?.length}{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    height: 30,
    width: 30,
    borderRadius: 30,
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
  cardTitleHeader: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeader: {
    paddingTop: 17,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  socialBarlabel: {
    marginLeft: 20,
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
