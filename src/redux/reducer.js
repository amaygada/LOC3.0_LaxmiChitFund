import {combineReducers} from 'redux'
import {CLEAR_USER_DATA , UPDATE_API_TOKEN, UPDATE_USER_DEETS , USER_SIGNIN_INFO_STORE , SIGN_IN_USER_UPDATE , CHANGE_LOG_STATUS , CHANGE_SIGN_STATUS} from './actions.js'

const merge = (prev,next) => Object.assign({},prev,next)

const userReducer = (state = {} , action) => {
    switch(action.type){
        case CLEAR_USER_DATA:
            return ({})
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

const reducer = combineReducers({
    user : userReducer,
    log : logReducer,
    sign : signReducer,
})

export default reducer
