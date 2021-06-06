import { ADD_CARD, ADD_QUIZ, CREATE_DECK, DeckAction, SET_DECKS } from "../actions/Deck";

export default function decks(state:any = {}, action:DeckAction){
    
    switch(action.type){
        case CREATE_DECK:
            return {
                ...state,
                ...action.payload
            }
        case ADD_CARD:
            return {
                ...state,
                [action.payload.deckID]:{
                    ...state[action.payload.deckID],
                    cardsIds:state[action.payload.deckID].cardsIds.concat(action.payload.cardID)
                }
            }
        case ADD_QUIZ:
            return {
                ...state,
                [action.payload.deckID]:{
                    ...state[action.payload.deckID],
                    quizzes:state[action.payload.deckID].quizzes.concat(action.payload.quizID)
                }
            }
        default:
            return state
    }
}