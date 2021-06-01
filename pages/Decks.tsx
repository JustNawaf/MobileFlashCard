import React, { Component } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { DeckInterface } from '../interfaces';

type DecksType = {
    decks:Array<DeckInterface>
};




class Decks extends Component<DecksType> {

    renderDeck = (render:any) => {
        const { item } = render;
        return (
        <View style={tailwind('w-full my-2 bg-blue-400 flex justify-center items-center h-36 z-10 text-center rounded-md')}>
            <Text style={tailwind('text-3xl text-white')}>{item.title}</Text> 
            <Text style={tailwind('text-3xl text-white')}>Cards : {item.cards.length}</Text>    
        </View> 
        )
            
    }

    render() {
        const { decks } = this.props;
        return (
            <View style={tailwind('bg-red-100 w-full h-full flex justify-center items-center')}>
                {/* {
                    decks.map((deck) => (
                        <View style={tailwind('mt-6 bg-blue-400 flex justify-center items-center w-2/3 h-36 z-10 text-center rounded-md')}>
                            <Text style={tailwind('text-3xl text-white')}>{deck.title}</Text>    
                        </View> 
                    ))
                } */}

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