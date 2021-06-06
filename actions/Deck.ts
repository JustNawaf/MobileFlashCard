import { DeckInterface } from "../interfaces";


export const SET_DECKS = 'SET_DECKS';
export const CREATE_DECK = 'CREATE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const ADD_QUIZ = 'ADD_QUIZ';

export type DeckAction = {
    type:string,
    payload:{
        cardID?:any,
        deckID?:any,
        quizID?:any
    },
}

export function setDecks(decks:any){
    return {
        type:SET_DECKS,
        payload:{
            decks
        }
    };
}

export function createDeck(deck:DeckInterface){
    return {
        type:CREATE_DECK,
        payload:{
            [deck.id]:deck
        }
    };
}

export function addCard(cardID:string,deckID:string){
    return {
        type:ADD_CARD,
        payload:{
            cardID,
            deckID
        }
    };
}

export function addQuiz(quizID:string,deckID:string){
    return {
        type:ADD_QUIZ,
        payload:{
            quizID,
            deckID
        }
    };
}