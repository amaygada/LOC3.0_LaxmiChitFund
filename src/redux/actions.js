//api imports
import {login} from './../api/api.js'

//action types
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export const CHANGE_LOG_STATUS = 'CHANGE_LOG_STATUS'
export const UPDATE_USER_DEETS = 'EXPORT_USER_DEETS'
export const CHANGE_SIGN_STATUS = 'CHANGE_SIGN_STATUS'
export const USER_SIGNIN_INFO_STORE = 'USER_SIGNIN_INFO_STORE'
export const SIGN_IN_USER_UPDATE = 'SIGN_IN_USER_UPDATE'
export const UPDATE_API_TOKEN = 'UPDATE_API_TOKEN'

//action creators
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
        dispatch(change_sign_stat(true))
        const response = await signup_apicall(obj)
        dispatch(signin_user_update(response.data))
        console.log(response.data)
        dispatch(change_sign_stat(false))
    }catch(e){
        dispatch(change_sign_stat(false))
        console.log(e)
        alert(e)
    }
}