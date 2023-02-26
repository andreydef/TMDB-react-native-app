import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import photosReducer from './src/store/reducers/photos';
import AppNavigator from './src/navigation/AppNavigator';

const rootReducer = combineReducers({
  photos: photosReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk),
  // composeWithDevTools()
);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
