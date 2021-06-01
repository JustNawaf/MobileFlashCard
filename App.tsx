/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import 'react-native-gesture-handler';
 import { NavigationContainer } from '@react-navigation/native';
 import {
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';

 import { Colors } from 'react-native/Libraries/NewAppScreen';
import Tabs from './components/Tabs';
import { Provider } from 'react-redux';
import store from './store';



 export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Tabs/>
        </NavigationContainer>
      </Provider>
    );
  }
