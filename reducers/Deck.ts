import { CREATE_DECK, DeckAction } from "../actions/Deck";

export default function decks(state:any = [], action:DeckAction){
    
    switch(action.type){
        case CREATE_DECK:
            return state.concat(action.payload)

        default:
            return state
    }
}