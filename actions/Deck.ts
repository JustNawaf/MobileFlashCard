import { DeckInterface } from "../interfaces";

export const CREATE_DECK = 'CREATE_DECK';

export type DeckAction = {
    type:string,
    payload:Array<any> | Object,
}


export function createDeck(deck:DeckInterface){
    return {
        type:CREATE_DECK,
        payload:deck
    };
}