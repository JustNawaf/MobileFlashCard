import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './components/Tabs';
import { Provider } from 'react-redux';
import store from './store';
import { createStackNavigator } from '@react-navigation/stack';
import DeckView from './pages/DeckView';
import AddCard from './pages/AddCard';

const Stack = createStackNavigator();

 export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
            <Stack.Screen name="DeckView" component={DeckView} options={({ route }) => ({ title: route.params.title })} />
            <Stack.Screen name="AddCard" component={AddCard} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
