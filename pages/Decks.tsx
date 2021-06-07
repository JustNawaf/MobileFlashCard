import React, { Component } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { DeckInterface } from '../interfaces';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type DecksType = {
    decks:Array<DeckInterface>
};

class Decks extends Component<DecksType> {
    

    renderDeck = (render:any) => {
        const { item } = render;

        return (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DeckView',{
                id:item.id,
                title:item.title
            })}>
                <View style={tailwind('h-32 my-1 px-4 py-2 border-b border-gray-100')}>
                    <Text style={tailwind('text-gray-600 text-center text-2xl bg-gray-200 rounded-md')}>{item.title}</Text>
                    <View style={tailwind('flex flex-row justify-between items-center mt-4')}>
                        <View style={tailwind('bg-green-200 w-1/3 mx-2 rounded-md')}>
                            <Text style={tailwind('text-center text-lg text-white')}>{item.cardsIds.length}</Text>
                            <Text style={tailwind('text-center text-lg text-white')}>Cards</Text>
                        </View>
                        <View style={tailwind('bg-blue-200 w-1/3 mx-2 rounded-md')}>
                            <Text style={tailwind('text-center text-lg text-white')}>{item.cardsIds.length}</Text>
                            <Text style={tailwind('text-center text-lg text-white')}>Quizzes</Text>
                        </View>
                    </View> 
                </View>
            </TouchableWithoutFeedback>
        )
            
    }

    render() {
        const { decks } = this.props;
        return (
            <View style={tailwind('bg-white w-full h-full')}>
                <FlatList
                    style={tailwind('flex w-full')}
                    data={decks}
                    renderItem={this.renderDeck}
                    keyExtractor={(item) => item.id}
                    // contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                />
                {
                    decks.length === 0 && 
                    <View style={tailwind('w-full h-full justify-center items-center')}>
                        <Text style={tailwind('text-lg bg-green-100 text-green-300 py-1 px-2 rounded-md')}>You dont have any decks yet !</Text>
                    </View>
                }
            </View>
        )
    }
}


function mapStateToProps(store:any, props:DecksType){
    const { decks } = store;
    return {
        decks:Object.keys(decks).length !== 0 ? Object.values(decks):[]
    };
}

export default connect(mapStateToProps)(Decks)

