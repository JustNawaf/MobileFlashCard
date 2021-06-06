import { ADD_ANSWER_MULTIPLE_CHOICES, ADD_ANSWER_TRUE_OR_FALSE, CREATE_QUIZ, QuizAction, SET_COMPLETED } from "../actions/Quizzes";

export default function quizzes(state:any = {}, action:QuizAction){
    
    switch(action.type){
        case CREATE_QUIZ:
            return {
                ...state,
                ...action.payload
            }
        case ADD_ANSWER_TRUE_OR_FALSE:
            return {
                ...state,
                [action.payload.quizID]:{
                    ...state[action.payload.quizID],
                    questions:{
                        ...state[action.payload.quizID]['questions'],
                        [action.payload.cardID]:{
                            ...state[action.payload.cardID],
                            answer:action.payload.answer,
                            mark:action.payload.mark
                        }
                    }
                }
            }
        case SET_COMPLETED:
            return {
                ...state,
                [action.payload.quizID]:{
                    ...state[action.payload.quizID],
                    completed:true
                }
            }
        case ADD_ANSWER_MULTIPLE_CHOICES:{
            return {
                ...state,
                [action.payload.quizID]:{
                    ...state[action.payload.quizID],
                    questions:{
                        ...state[action.payload.quizID]['questions'],
                        [action.payload.cardID]:{
                            ...state[action.payload.cardID],
                            answer:action.payload.answer,
                            mark:action.payload.mark
                        }
                    }
                }
            }
        }
        default:
            return state
    }
}