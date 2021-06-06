import { QuizInterface } from "../interfaces";

export const CREATE_QUIZ = 'CREATE_QUIZ';
export const ADD_ANSWER_TRUE_OR_FALSE = 'ADD_ANSWER_TRUE_OR_FALSE';
export const ADD_ANSWER_MULTIPLE_CHOICES = 'ADD_ANSWER_MULTIPLE_CHOICES';
export const SET_COMPLETED = 'SET_COMPLETED';

export type QuizAction = {
    type:string,
    payload:Array<any> | Object | any,
}



export function createQuiz(quiz:QuizInterface){
    return {
        type:CREATE_QUIZ,
        payload:{
            [quiz.id]:quiz
        }
    };
}

export function addAnswerTrueOrFalse(quizID:string,cardID:string,answer:boolean,mark:0|1){
    return {
        type:ADD_ANSWER_TRUE_OR_FALSE,
        payload:{
            quizID,
            cardID,
            answer,
            mark
        }
    };
}

export function addAnswerMultipleChoices(quizID:string,cardID:string,answer:Number,mark:0|1){
    return {
        type:ADD_ANSWER_MULTIPLE_CHOICES,
        payload:{
            quizID,
            cardID,
            answer,
            mark
        }
    };
}

export function setCompleted(quizID:string){
    return {
        type:SET_COMPLETED,
        payload:{
            quizID
        }
    };
}