import {
  SET_PHOTOS,
  SET_PHOTOS_PAGE,
  SET_PHOTO_LIKE,
  SET_PHOTO_UNLIKE,
} from '../actions/photos';

const initialState = {
  allPhotos: [],
  favoritesPhotos: [],
  page: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        allPhotos: action.photos,
      };
    case SET_PHOTOS_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_PHOTO_LIKE:
      return {
        ...state,
        favoritesPhotos: [...state.favoritesPhotos, action.payload],
      };
    case SET_PHOTO_UNLIKE:
      return {
        ...state,
        favoritesPhotos: state.favoritesPhotos.filter(
          photo => photo.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};
