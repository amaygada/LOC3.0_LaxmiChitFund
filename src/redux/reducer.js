import {combineReducers} from 'redux'
import {ADD_TRAVEL_TO_NEW, ADD_HOTELS_TO_NEW,ADD_COUNTRY_TO_NEW,ADD_TOURIST_ATTR_TO_NEW,ADD_CITIES_TO_NEW, CLEAR_USER_DATA , ADD_LAT_LONG, UPDATE_USER_DEETS , USER_SIGNIN_INFO_STORE , SIGN_IN_USER_UPDATE , CHANGE_LOG_STATUS , CHANGE_SIGN_STATUS} from './actions.js'

const merge = (prev,next) => Object.assign({},prev,next)

const userReducer = (state = {} , action) => {
    switch(action.type){
        case CLEAR_USER_DATA:
            return ({})
        case ADD_LAT_LONG:
            return ({user_loc : action.payload})
        case UPDATE_USER_DEETS:
            return ({user_info : action.payload})
        case USER_SIGNIN_INFO_STORE:
            return merge(state , {user_temp : action.payload})
        case SIGN_IN_USER_UPDATE:
            return merge(state , {user_sign : action.payload})
        default:
            return state
    }
}

const logReducer = (state = false , action) => {
    switch(action.type){
        case CHANGE_LOG_STATUS:
            return (action.payload)
        default:
            return state
    }
}

const signReducer = (state  = false , action) => {
    switch(action.type){
        case CHANGE_SIGN_STATUS:
            return (action.payload)
        default : 
            return state
    }
}

const newReducer = (state={} , action) => {
    switch(action.type){
        case ADD_CITIES_TO_NEW:
            return merge(state, {cities : action.payload})
        case ADD_TOURIST_ATTR_TO_NEW:
            return merge(state , {tour : action.payload})
        case ADD_COUNTRY_TO_NEW:
            return merge(state , {country : action.payload})
        case ADD_HOTELS_TO_NEW:
            return merge(state , {country : action.payload})
        case ADD_TRAVEL_TO_NEW:
            return merge(state , {country : action.payload})
        default : 
            return state 
    }
}

const presentReducer = (state={} , action) => {
    switch(action.type){
        default : 
            return state 
    }
}

const pastReducer = (state={} , action) => {
    switch(action.type){
        default : 
            return state 
    }
}

const reducer = combineReducers({
    user : userReducer,
    log : logReducer,
    sign : signReducer,
    new : newReducer,
    present : presentReducer,
    past : pastReducer
})

export default reducer
