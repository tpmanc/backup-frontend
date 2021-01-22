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

const initialState = {
    status: 'init',
    profileStatus: 'init',
    profile: null,
    token: null,
    expiresAt: null,
}

export function profileReducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOGIN_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case PROFILE_LOGIN_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                profile: action.payload.profile,
                token: action.payload.token,
                expiresAt: new Date(action.payload.expiresAt),
            }
        }
        case PROFILE_LOGIN_ERROR: {
            return {
                ...state,
                status: 'error',
                profile: null,
                token: null,
                expiresAt: null,
            }
        }

        case PROFILE_LOAD_START: {
            return {
                ...state,
                profileStatus: 'loading',
            }
        }
        case PROFILE_LOAD_SUCCESS: {
            return {
                ...state,
                profileStatus: 'loaded',
                profile: action.payload.profile,
            }
        }
        case PROFILE_LOAD_ERROR: {
            return {
                ...state,
                profileStatus: 'error',
                profile: null,
                token: null,
                expiresAt: null,
            }
        }

        case PROFILE_LOGOUT_START: {
            return state
        }
        case PROFILE_LOGOUT_SUCCESS: {
            return {
                ...state,
                profile: null,
                token: null,
                expiresAt: null,

            }
        }
        case PROFILE_LOGOUT_ERROR: {
            return state
        }

        default:
            return state
    }
}
