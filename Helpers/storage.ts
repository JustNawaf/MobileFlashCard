// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CardInterface, DeckInterface } from '../interfaces';

// const DECKS_KEY = 'DECKS_KEY'

// const CARDS_KEY = 'CARDS_KEY'


// export const addDeckST = async (deck:DeckInterface) => {
//     AsyncStorage.mergeItem(DECKS_KEY,JSON.stringify({
//         [deck.id]:deck
//     }))
// };

// export const addCardST = async (card:CardInterface) => {
//     AsyncStorage.mergeItem(CARDS_KEY,JSON.stringify({
//         [card.id]:card
//     }));
//     addCardToDeckST(card.id,card.deckID);
// };

// const addCardToDeckST = async (cardID:string,deckID:string) => {
//     const decks = await getDecks();
//     decks[deckID].cards = decks[deckID].cards.concat(cardID);
//     setDecks(decks);
// };

// const setDecks = async (decks:any) => {
//     AsyncStorage.setItem(DECKS_KEY,JSON.stringify(decks))
// };

// export const getDecks = async () => {
//     const value = await AsyncStorage.getItem(DECKS_KEY);

//     if(value === null){
//         return {};
//     };

//     return JSON.parse(value);
// };

// export const getCards = async () => {
//     const value = await AsyncStorage.getItem(CARDS_KEY);

//     if(value === null){
//         return {};
//     };

//     return JSON.parse(value);
// };
