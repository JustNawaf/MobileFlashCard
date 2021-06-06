import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, Button, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { createDeck } from '../actions/Deck';
import { generateID } from '../Helpers';
import { addDeckST } from '../Helpers/storage';

type StateCreateDeck = {
    deckTitle:string,
    dispatch:Function,
}

class CreateDeck extends Component<StateCreateDeck>{


    state = {
        deckTitle:''
    };

    onDeckTitleChange = (event:string) => {
        this.setState({
            deckTitle:event
        })
    };

    crDeck = () => {
        const { dispatch } = this.props;
        const deck = {
            id:generateID(),
            title:this.state.deckTitle,
            cardsIds:[],
            quizzes:[]
        };
        dispatch(createDeck(deck));
        // addDeckST(deck);
    };

    render() {
        const { deckTitle } = this.state;
        return (
            <View style={tailwind('w-full h-full flex justify-between')}>
                <View style={tailwind('h-1/2 flex justify-around')}>
                    <Text style={tailwind('text-3xl text-center')}>What is the name of your deck ?</Text>
                    <SafeAreaView>
                        <TextInput
                        style={tailwind('bg-gray-200 p-0 px-2 mx-4 border border-gray-400 rounded')}
                            onChangeText={this.onDeckTitleChange}
                            value={deckTitle}
                        />
                    </SafeAreaView>
                    <Button color={'black'} title="create" onPress={() => this.crDeck()}/>
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