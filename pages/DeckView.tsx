import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import tailwind from 'tailwind-rn';
import { DeckInterface } from '../interfaces';


type DeckViewType = {
    deck:DeckInterface
};
class DeckView extends Component<DeckViewType> {

    toAddCardPage = () => {
        this.props.navigation.navigate('AddCard', { 
            id:this.props.deck.id
         });
    };

    render() {
        const { deck } = this.props;
        return (
            <View style={tailwind('w-full h-full')}>
                <View style={{ ...tailwind('w-full h-1/2') }}>
                    <View style={tailwind('w-2/3 my-4 self-center px-4 py-2 bg-red-400 rounded-md')}>
                        <Text style={tailwind('text-white text-center text-2xl')}>{ deck.title }</Text>
                        <View style={tailwind('w-1/2 bg-white my-2 self-center rounded-md')}>
                            <Text style={tailwind('text-center p-1')}>{ deck.cards.length } Cards</Text>
                        </View>
                    </View>

                </View>
                <View style={tailwind('h-1/2 justify-evenly')}>
                    <TouchableOpacity onPress={ this.toAddCardPage }
                        style={tailwind('w-1/2 self-center border border-gray-400 text-white py-1 rounded')}>
                                <Text style={tailwind('text-gray-400 text-center')}>Add Card</Text>
                    </TouchableOpacity>
                    {
                        deck.cards.length !== 0 && 
                        <TouchableOpacity style={tailwind('w-1/2 self-center bg-black text-white py-1 rounded')}>
                            <Text style={tailwind('text-white text-center')}>Start Quiz</Text>
                        </TouchableOpacity>
                    }
                    {
                        deck.cards.length === 0 && 
                        <Text style={tailwind('w-1/2 bg-red-100 rounded-md p-1 self-center text-red-400 text-xs text-center')}>
                            You need to add cards to this deck to able quiz yourself.
                        </Text>
                    }
                </View>
            </View>
        )
    }
}

function mapStateToProps(store:any,props:any){
    const id = props.route.params.id;
    const deck = store.decks.find((deck:DeckInterface) => deck.id === id)
    return {
        deck
    }
}




export default connect(mapStateToProps)(DeckView);
