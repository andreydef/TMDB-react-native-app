export const SET_PHOTOS = 'SET_PHOTOS';
export const SET_PHOTOS_PAGE = 'SET_PHOTOS_PAGE';

const apiKey = '4d01fe30808374ca5b96432229d14363';

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
      photos: [...props?.allPhotos, ...resData?.results?.map(el => el)],
      page: resData?.page,
    });
  };
};
