import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllPhotosScreen from '../screens/AllPhotosScreen';
import AllFavoritesScreen from '../screens/AllFavoritesScreen';
import ItemCardScreen from '../screens/ItemCardScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PhotosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Photos" component={AllPhotosScreen} />
      <Stack.Screen
        name="ItemCard"
        component={ItemCardScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 15,
          },
          tabBarIconStyle: { display: 'none' },
          headerShown: false,
        }}>
        <Tab.Screen name="Photos" component={PhotosStack} />
        <Tab.Screen name="Favorites" component={AllFavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
