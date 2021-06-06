import { CardInterface } from "../interfaces";

export const SET_CARDS = 'SET_CARDS';
export const CREATE_CARD = 'CREATE_CARD';

export type CardAction = {
    type:string,
    payload:Array<any> | Object | any,
}

export function setCards(cards:any){
    return {
        type:SET_CARDS,
        payload:{
            cards
        }
    };
}

export function createCard(card:CardInterface){
    return {
        type:CREATE_CARD,
        payload:{
            [card.id]:card
        }
    };
}