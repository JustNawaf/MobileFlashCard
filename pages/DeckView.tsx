import { cancelScheduledNotificationAsync } from 'expo-notifications';
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import tailwind from 'tailwind-rn';
import { removeDeckNotification } from '../actions/DecksNotifications';
import { addQuizToDeck } from '../actions/Shared';
import { generateID } from '../Helpers';
import { DeckInterface, DeckNotification, QuizInterface } from '../interfaces';


type DeckViewType = {
    deck:DeckInterface,
    remainingQuizzes:Array<String>,
    deckNotifications:any,
    dispatch:Function
};
class DeckView extends Component<DeckViewType> {


    toAddCardPage = () => {
        this.props.navigation.navigate('AddCard', { 
            id:this.props.deck.id
         });
    };

    addQuiz = (quiz:QuizInterface, dispatch:Function) => new Promise((resolve:Function, reject:Function) => {
        dispatch(addQuizToDeck(quiz));
        resolve();
    })



    startQuiz = () => {
        const { deck, dispatch, deckNotifications } = this.props;
        const quiz = this.generateQuiz(deck);
        this.addQuiz(quiz,dispatch).then(() => {
            this.props.navigation.navigate('QuizView', {
                current:1,
                total:Object.keys(quiz.questions).length, 
                id:quiz.id
             });
        })

        if(deckNotifications !== undefined){
            dispatch(removeDeckNotification(deckNotifications.deckID));
            cancelScheduledNotificationAsync(deckNotifications.id);
        }


    };

    generateQuiz = (deck:DeckInterface) => {
        
        return {
            id:generateID(),
            deckID:deck.id,
            questions:this.generateQuestions(deck),
            completed:false
        };
    };

    generateQuestions = (deck:DeckInterface) => {
        const questions = {};
        deck.cardsIds.forEach((card) => {
            questions[card] = {
                cardID:card,
                ans:null
            }
        })
        return questions;
    };

    render() {
        const { deck, remainingQuizzes } = this.props;
        return (
            <View style={tailwind('w-full h-full')}>
                <View style={{ ...tailwind('w-full h-1/2 items-center justify-center') }}>
                    <View style={tailwind('w-5/6 h-1/2 my-4 self-center px-4 py-2 bg-red-400 rounded-md justify-evenly')}>
                        <Text style={tailwind('text-white text-center text-3xl')}>{ deck.title }</Text>
                        <View style={tailwind('w-1/2 bg-white my-2 self-center rounded-md')}>
                            <Text style={tailwind('text-center p-1')}>{ deck.cardsIds.length } Cards</Text>
                        </View>
                    </View>

                </View>
                <View style={tailwind('h-1/2 justify-evenly')}>
                    <TouchableOpacity onPress={ this.toAddCardPage }
                        style={tailwind('w-5/6 self-center border border-gray-400 text-white py-1 rounded')}>
                                <Text style={tailwind('text-gray-400 text-center text-lg')}>Add Card</Text>
                    </TouchableOpacity>
                    {
                        deck.cardsIds.length !== 0 && 
                        <TouchableOpacity onPress={() => this.startQuiz() } style={tailwind('w-5/6 self-center bg-black text-white py-1 rounded')}>
                            <Text style={tailwind('text-white text-center text-lg')}>Start Quiz</Text>
                        </TouchableOpacity>
                    }
                    {
                        deck.cardsIds.length === 0 && 
                        <Text style={tailwind('w-5/6 text-lg bg-red-100 rounded-md p-1 self-center text-red-400 text-center')}>
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
    const deck = store.decks[id]
    const deckNotifications = Object.keys(store.decksNotifications).filter((index) => deck.id === index).length === 0 ? undefined:store.decksNotifications[deck.id]
    console.log(deckNotifications)
    const quizzes = store.quizzes;
    const remainingQuizzes = Object.keys(quizzes).filter((index) => {
        const quiz = quizzes[index];
        if(quiz.deckID === deck.id && !quiz.completed){
            return true;
        }
        return false;
    })
    return {
        deck,
        remainingQuizzes,
        deckNotifications
    }
}




export default connect(mapStateToProps)(DeckView);
