import Middleware from '../middleware';
import Reducers from '../reducers';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface StoreInterface {
    
}


const persistConfig = {
  key: 'root3',
  storage:AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, Reducers)


export const store = createStore(persistedReducer,Middleware)
export const persistor = persistStore(store)
