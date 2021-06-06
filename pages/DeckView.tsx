import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import tailwind from 'tailwind-rn';
import { addQuizToDeck } from '../actions/Shared';
import { generateID } from '../Helpers';
import { DeckInterface, QuizInterface } from '../interfaces';


type DeckViewType = {
    deck:DeckInterface,
    remainingQuizzes:Array<String>,
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
        const { deck, dispatch } = this.props;
        const quiz = this.generateQuiz(deck);
        this.addQuiz(quiz,dispatch).then(() => {
            this.props.navigation.navigate('QuizView', {
                current:1,
                total:Object.keys(quiz.questions).length, 
                id:quiz.id
             });
        })


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
                <View style={{ ...tailwind('w-full h-1/2') }}>
                    <View style={tailwind('w-2/3 my-4 self-center px-4 py-2 bg-red-400 rounded-md')}>
                        <Text style={tailwind('text-white text-center text-2xl')}>{ deck.title }</Text>
                        <View style={tailwind('w-1/2 bg-white my-2 self-center rounded-md')}>
                            <Text style={tailwind('text-center p-1')}>{ deck.cardsIds.length } Cards</Text>
                        </View>
                    </View>

                </View>
                <View style={tailwind('h-1/2 justify-evenly')}>
                    <TouchableOpacity onPress={ this.toAddCardPage }
                        style={tailwind('w-1/2 self-center border border-gray-400 text-white py-1 rounded')}>
                                <Text style={tailwind('text-gray-400 text-center')}>Add Card</Text>
                    </TouchableOpacity>
                    {/* {
                        remainingQuizzes.length !== 0 && 
                        (
                            remainingQuizzes.map((index) => (
                                <View>
                                    <Text>Hello</Text>
                                </View>
                            ))
                        )
                    } */}
                    {
                        deck.cardsIds.length !== 0 && 
                        <TouchableOpacity onPress={() => this.startQuiz() } style={tailwind('w-1/2 self-center bg-black text-white py-1 rounded')}>
                            <Text style={tailwind('text-white text-center')}>Start Quiz</Text>
                        </TouchableOpacity>
                    }
                    {
                        deck.cardsIds.length === 0 && 
                        <Text style={tailwind('w-2/3 bg-red-100 rounded-md p-1 self-center text-red-400 text-xs text-center')}>
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
        remainingQuizzes
    }
}




export default connect(mapStateToProps)(DeckView);
