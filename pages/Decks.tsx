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
                <View style={tailwind('w-full my-2 bg-blue-400 flex justify-center items-center h-36 z-10 text-center rounded-md')}>
                    <Text style={tailwind('text-3xl text-white')}>{item.title}</Text> 
                    <Text style={tailwind('text-3xl text-white')}>Cards : {item.cards.length}</Text>    
                </View> 
            </TouchableWithoutFeedback>
        )
            
    }

    render() {
        const { decks } = this.props;
        return (
            <View style={tailwind('bg-red-100 w-full h-full flex justify-center items-center')}>
                <FlatList
                    style={tailwind('flex w-full')}
                    data={decks}
                    renderItem={this.renderDeck}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                />
            </View>
        )
    }
}



const styles = StyleSheet.create({

    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        
        elevation: 17,
    }
});


function mapStateToProps(store:any, props:DecksType){
    const { decks } = store;
    return {
        decks
    };
}

export default connect(mapStateToProps)(Decks)