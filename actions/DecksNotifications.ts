import { DeckNotification } from "../interfaces";


export const ADD_DECK_NOTIFICATION = 'ADD_DECK_NOTIFICATION';
export const REMOVE_DECK_NOTIFICATION = 'REMOVE_DECK_NOTIFICATION';

export type DeckNotificationAction = {
    type:string,
    payload:any
}


export function createDeckNotification(deckNotification:DeckNotification){
    return {
        type:ADD_DECK_NOTIFICATION,
        payload:{
            [deckNotification.deckID]:deckNotification
        }
    }
}

export function removeDeckNotification(id:string){
    return {
        type:REMOVE_DECK_NOTIFICATION,
        payload:{
            id
        }
    }
}

