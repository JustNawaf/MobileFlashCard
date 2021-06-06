import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/Tabs';
import { Provider } from 'react-redux';
import  { store,persistor } from './store';
import { createStackNavigator } from '@react-navigation/stack';
import DeckView from './pages/DeckView';
import AddCard from './pages/AddCard';
import { PersistGate } from 'redux-persist/integration/react'
import QuizView from './pages/QuizView';
import QuizResult from './pages/QuizResult';

const Stack = createStackNavigator();

 export default function App() {

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
                <Stack.Screen name="DeckView" component={DeckView} options={({ route }) => ({ title: route.params.title })} />
                <Stack.Screen name="AddCard" component={AddCard} />
                <Stack.Screen name="QuizView" component={QuizView} options={({ route }) => ({ title: `${route.params.current}/${route.params.total}` })}/>
                <Stack.Screen name="QuizResult" component={QuizResult} options={({ route }) => ({ title: 'Quiz Result' })}/>
              </Stack.Navigator>
            </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }


