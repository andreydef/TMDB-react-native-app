export const SET_PHOTOS = 'SET_PHOTOS';
export const SET_PHOTOS_PAGE = 'SET_PHOTOS_PAGE';
export const SET_PHOTO_LIKE = 'SET_PHOTO_LIKE';
export const SET_PHOTO_UNLIKE = 'SET_PHOTO_UNLIKE';

const apiKey = '4d01fe30808374ca5b96432229d14363';

export const setPhotoLike = photo => dispatch => {
  dispatch({
    type: SET_PHOTO_LIKE,
    payload: photo,
  });
};

export const removePhotoLike = photo => dispatch => {
  dispatch({
    type: SET_PHOTO_UNLIKE,
    payload: photo,
  });
};

export const fetchPhotos = props => {
  return async dispatch => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${
        props?.page || 1
      }`,
    );

    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error);
    }

    dispatch({
      type: SET_PHOTOS,
      photos: [
        ...props?.allPhotos,
        ...resData?.results?.map(obj => ({ ...obj, like: false })),
      ],
      favoritesPhotos: props?.favoritesPhotos,
      page: resData?.page,
    });
  };
};
