import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer.js'
import AsyncStorage from '@react-native-community/async-storage'
import {persistStore , persistReducer} from 'redux-persist'

const persistConfig = {
    key : 'root',
    storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig , reducer)
let store = createStore(persistedReducer , applyMiddleware(thunk))
export let persistor = persistStore(store)

export default store
