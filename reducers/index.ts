import { combineReducers } from 'redux';
import decks from './Deck';
import cards from './Cards';
import quizzes from './Quizzes';
import decksNotifications from './DecksNotifications';
export default combineReducers({
    decks,
    cards,
    quizzes,
    decksNotifications
});

