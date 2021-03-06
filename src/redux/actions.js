//api imports
import { ActionSheetIOS } from 'react-native'
import {login , signup} from './../api/api.js'

//action types
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export const CHANGE_LOG_STATUS = 'CHANGE_LOG_STATUS'
export const UPDATE_USER_DEETS = 'EXPORT_USER_DEETS'
export const CHANGE_SIGN_STATUS = 'CHANGE_SIGN_STATUS'
export const USER_SIGNIN_INFO_STORE = 'USER_SIGNIN_INFO_STORE'
export const SIGN_IN_USER_UPDATE = 'SIGN_IN_USER_UPDATE'
export const ADD_LAT_LONG = 'ADD_LAT_LONG'
export const ADD_CITIES_TO_NEW = 'ADD_CITIES_TO_NEW'
export const ADD_TOURIST_ATTR_TO_NEW = 'ADD_TOURIST_ATTR_TO_NEW'
export const ADD_COUNTRY_TO_NEW = 'ADD_COUNTRY_TO_NEW'
export const ADD_HOTELS_TO_NEW = 'ADD_HOTELS_TO_NEW'
export const ADD_TRAVEL_TO_NEW = 'ADD_TRAVEL_TO_NEW'
export const CLEAR_NEW = 'CLEAR_NEW'
export const ADD_USER_DEETS_TO_NEW = 'ADD_USER_DEETS_TO_NEW'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE'
export const SET_EXPENSE = 'SET_EXPENSE'
export const ADD_ITENARY = 'ADD_ITENARY'
export const UPDATE_NAME = 'UPDATE_NAME'

//action creators
export const update_name = update => ({
    type : UPDATE_NAME , 
    payload : update
})

export const add_itenary = update => ({
    type : ADD_ITENARY,
    payload : update
}) 

export const set_expense = update => ({
    type : SET_EXPENSE,
    payload : update
})

export const add_expense = update => ({
    type : ADD_EXPENSE,
    payload : update
})

export const remove_expense = update => ({
    type : REMOVE_EXPENSE,
    payload : update
})

export const add_user_deets_to_new = update => ({
    type : ADD_USER_DEETS_TO_NEW,
    payload : update
})

export const clear_new = update => ({
    type : CLEAR_NEW,
    payload : update
})

export const add_cities_to_new = update => ({
    type : ADD_CITIES_TO_NEW,
    payload: update
})

export const add_tourist_attr_to_new = update => ({
    type : ADD_TOURIST_ATTR_TO_NEW,
    payload: update
})

export const add_country_to_new = update => ({
    type : ADD_COUNTRY_TO_NEW,
    payload: update
})

export const add_hotels_to_new = update => ({
    type : ADD_HOTELS_TO_NEW,
    payload: update
})

export const add_travel_to_new = update => ({
    type : ADD_TRAVEL_TO_NEW,
    payload: update
})

export const sign_in_user_update = update => ({
    type : SIGN_IN_USER_UPDATE,
    payload : update
})

export const clear_user_data = update => ({
    type : CLEAR_USER_DATA,
    payload : update
})

export const change_log_status = update => ({
    type : CHANGE_LOG_STATUS,
    payload : update
})

export const change_sign_status = update => ({
    type : CHANGE_SIGN_STATUS,
    payload : update
})

export const update_user_deets = update => ({
    type : UPDATE_USER_DEETS,
    payload : update
})

export const user_signin_info_store = update => ({
    type : USER_SIGNIN_INFO_STORE,
    payload : update
})

export const add_lat_long = update => ({
    type : ADD_LAT_LONG,
    payload : update

})


//async action creators
export const loginUser = (email , password) => async dispatch => {
    try{
        dispatch(change_log_status(true))
        const response = await login(email , password)
        dispatch(update_user_deets(response.data))
    }catch(e){
        dispatch(change_log_status(false))
        alert(e)
        console.log(e)
    }
}

export const signupUser = (obj) => async dispatch => {
    try{
        dispatch(change_sign_status(true))
        const response = await signup(obj)
        dispatch(change_sign_status(false))
    }catch(e){
        dispatch(change_sign_status(false))
        console.log(e)
        alert(e)
    }
}