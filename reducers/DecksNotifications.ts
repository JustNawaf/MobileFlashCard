import { ADD_DECK_NOTIFICATION, DeckNotificationAction, REMOVE_DECK_NOTIFICATION } from "../actions/DecksNotifications"

export default function decksNotifications(state:any = {}, action:DeckNotificationAction){
    
    switch(action.type){
        case ADD_DECK_NOTIFICATION:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_DECK_NOTIFICATION:
            let temp = {};
            Object.keys(state).forEach((key) => {
                console.log(key !== action.payload.id)
                if(key !== action.payload.id){
                    temp[key] = state[key]
                }
            });
            console.log(temp)
            return {
                ...temp
            }
        default:
            return state
    }
}