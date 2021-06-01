import Middleware from '../middleware';
import Reducers from '../reducers';
import { createStore } from 'redux';


export interface StoreInterface {
    
}



const store = createStore(Reducers, Middleware);


export default store;