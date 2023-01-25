import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/homescreen';
import React, { useState } from 'react';
import ShareImage from './screens/ShareImage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#rgba(126,235,166,1)',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Image"
          component={ShareImage}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#rgba(126,235,166,1)',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}