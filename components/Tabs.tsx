import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Decks from '../pages/Decks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateDeck from '../pages/CreateDeck';

const Tab = createBottomTabNavigator();

interface icons{
    [key:string]:string,
};


export default class Tabs extends Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel:() => (false),
                    tabBarIcon: ({ color, size }) => {
                    const icons:icons = {
                        Decks: 'account',
                        Profile: 'airplane',
                        Quiz: 'book-plus',
                        History: 'backup-restore',
                        Add: 'bed-single',

                    };

                    return (
                        <MaterialCommunityIcons
                        name={icons[route.name]}
                        color={color}
                        size={size}
                        />
                    );
                    },
                })}
                >
                <Tab.Screen name="Decks" component={Decks} />
                <Tab.Screen name="Profile" component={Decks}  />
                <Tab.Screen name="Quiz" component={CreateDeck} />
                <Tab.Screen name="History" component={Decks} />
                <Tab.Screen name="Add" component={Decks} />
            </Tab.Navigator>
        )
    }
}
