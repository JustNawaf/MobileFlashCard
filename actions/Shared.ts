import { CardInterface, QuizInterface } from "../interfaces";
import { createCard } from "./Cards";
import { addCard, addQuiz } from "./Deck";
import { createQuiz } from "./Quizzes";

export function addCardToDeck(card:CardInterface){
    return (dispatch:Function) => {
        dispatch(addCard(card.id,card.deckID));
        dispatch(createCard(card));
    }
}


export function addQuizToDeck(quiz:QuizInterface){
    return (dispatch:Function) => {
        dispatch(addQuiz(quiz.id,quiz.deckID));
        dispatch(createQuiz(quiz));
    }
}