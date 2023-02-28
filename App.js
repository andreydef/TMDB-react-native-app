import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import photosReducer from './src/store/reducers/photos';
import AppNavigator from './src/navigation/AppNavigator';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['allPhotos', 'favoritesPhotos'],
};

const rootReducer = combineReducers({
  photos: persistReducer(persistConfig, photosReducer),
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
