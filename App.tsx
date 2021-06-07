import React, { useEffect, useRef, useState } from 'react';
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
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { View, Text, Platform } from 'react-native';
import Loading from './pages/Loading';
import tailwind from 'tailwind-rn';

const Stack = createStackNavigator();


 export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // console.log(response);
      });
      
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
    
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <View style={tailwind('bg-gray-100 p-1')}>
            <Text style={tailwind('text-center font-bold text-lg')}>Flash Cards</Text>
          </View>
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


async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }