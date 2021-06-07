import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { createDeck } from '../actions/Deck';
import { createDeckNotification } from '../actions/DecksNotifications';
import { generateID } from '../Helpers';
import { addDeckST } from '../Helpers/storage';
import { schedulePushNotificationForDeck } from '../notifications';

type StateCreateDeck = {
    deckTitle:string,
    dispatch:Function,
    navigation:any
}

class CreateDeck extends Component<StateCreateDeck>{


    state = {
        deckTitle:'',
        error:{
            condition:true,
            classStyle:'border border-gray-300'
        }
    };

    onDeckTitleChange = (value:string) => {
        if(value === ''){
            this.setState({
                deckTitle:value,
                error:{
                    condition:true,
                    classStyle:'border border-red-400'
                }
            })
        }else{
            this.setState({
                deckTitle:value,
                error:{
                    condition:false,
                    classStyle:'border border-gray-300'
                }

            })
        }
    };

    crDeck = () => {
        const { deckTitle,error } = this.state;
        const { dispatch } = this.props;

        if(! error.condition){
            const deck = {
                id:generateID(),
                title:deckTitle,
                cardsIds:[],
                quizzes:[]
            };
            dispatch(createDeck(deck));
            schedulePushNotificationForDeck(deck).then((id) => dispatch(createDeckNotification({id,deckID:deck.id})));
            this.props.navigation.jumpTo("Decks")
        }
    };

    render() {
        const { deckTitle,error } = this.state;
        return (
            <View style={tailwind('w-full h-full flex justify-center')}>
                <View style={tailwind('h-1/2 flex justify-around')}>
                    <Text style={tailwind('text-3xl text-center')}>What is the name of your deck ?</Text>
                    <SafeAreaView style={tailwind('h-1/2 justify-between')}>
                        <TextInput
                        style={tailwind(`bg-gray-200 px-2 mx-4 ${error.classStyle} rounded text-black`)}
                            onChangeText={this.onDeckTitleChange}
                            value={deckTitle}
                        />
                        <TouchableOpacity onPress={() => this.crDeck()} style={tailwind(`self-center w-1/2 py-2 ${error.condition ? 'bg-gray-200':'bg-black'} rounded-md`)} disabled={error.condition}>
                            <Text style={tailwind(`text-center ${error.condition ? 'text-gray-300':'text-white'} text-lg`)}>Create</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
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



export default connect()(CreateDeck);