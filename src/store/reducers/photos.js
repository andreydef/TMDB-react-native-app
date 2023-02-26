import { SET_PHOTOS, SET_PHOTOS_PAGE } from '../actions/photos';

const initialState = {
  allPhotos: [],
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
    default:
      return state;
  }
};
