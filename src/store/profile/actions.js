import {
    PROFILE_LOAD_START,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_ERROR,
    PROFILE_LOGIN_START,
    PROFILE_LOGIN_SUCCESS,
    PROFILE_LOGIN_ERROR,
    PROFILE_REGISTER_START,
    PROFILE_REGISTER_SUCCESS,
    PROFILE_REGISTER_ERROR,
    PROFILE_LOGOUT_START,
    PROFILE_LOGOUT_SUCCESS,
    PROFILE_LOGOUT_ERROR,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'
import { jwtHelper } from '../../helpers/jwtHelper'
import { axiosHelper } from '../../helpers/axios-helper'
  
export const profileLogin = ({login, password}, callback, onError) => {
    return dispatch => {
      dispatch(profileLoginStart())
  
      axios
        .post(client.getApiUrl() + '/login', {
            email: login,
            password,
        })
        .then(res => {
            dispatch(
                profileLoginFinish({
                    status: 'ok',
                    profile: res.data.profile,
                    token: res.data.token,
                    expiresAt: res.data.expires_at,
                })
            )
            jwtHelper.setToken(res.data.token)
            callback()
        })
        .catch(err => {
            dispatch(profileLoginError())
            jwtHelper.removeToken()
            onError(err.message)
        })
    }
}
const profileLoginStart = res => ({
    type: PROFILE_LOGIN_START,
    payload: {
        ...res
    }
})
const profileLoginFinish = res => ({
    type: PROFILE_LOGIN_SUCCESS,
    payload: {
        ...res
    }
})
const profileLoginError = res => ({
    type: PROFILE_LOGIN_ERROR,
    payload: {
        ...res
    }
})

export const profileLoad = (onSuccess, onError) => {
    if (jwtHelper.getToken() !== null) {
        return dispatch => {
            dispatch(profileLoadStart())
        
            axiosHelper.get(
                client.getApiUrl() + '/profile',
                (res) => {
                    dispatch(
                        profileLoadFinish({
                            status: 'ok',
                            profile: res.data.profile,
                        })
                    )
                    onSuccess()
                },
                (err) => {
                    dispatch(profileLoadError())
                    jwtHelper.removeToken()
                    onError(err.message)
                },
            )
        }
    } else {
        return dispatch => {}
    }
}
const profileLoadStart = res => ({
    type: PROFILE_LOAD_START,
    payload: {
        ...res
    }
})
const profileLoadFinish = res => ({
    type: PROFILE_LOAD_SUCCESS,
    payload: {
        ...res
    }
})
const profileLoadError = res => ({
    type: PROFILE_LOAD_ERROR,
    payload: {
        ...res
    }
})

export const profileLogout = (onSuccess, onError) => {
    if (jwtHelper.getToken() !== null) {
        return dispatch => {
            dispatch(profileLogoutStart())
        
            axiosHelper.post(
                client.getApiUrl() + '/logout',
                (res) => {
                    dispatch(
                        profileLogoutFinish()
                    )
                    onSuccess()
                },
                (err) => {
                    dispatch(profileLogoutError())
                    onError(err.message)
                },
            )
        }
    } else {
        return dispatch => {}
    }
}
const profileLogoutStart = res => ({
    type: PROFILE_LOGOUT_START,
    payload: {
        ...res
    }
})
const profileLogoutFinish = res => ({
    type: PROFILE_LOGOUT_SUCCESS,
    payload: {
        ...res
    }
})
const profileLogoutError = res => ({
    type: PROFILE_LOGOUT_ERROR,
    payload: {
        ...res
    }
})
