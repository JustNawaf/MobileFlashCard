import { CardAction, CREATE_CARD, SET_CARDS } from "../actions/Cards"

export default function cards(state:any = {}, action:CardAction){
    
    switch(action.type){
        case CREATE_CARD:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}