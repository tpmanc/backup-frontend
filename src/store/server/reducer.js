import {
    SERVER_LOAD_START,
    SERVER_LOAD_SUCCESS,
    SERVER_LOAD_ERROR,
 } from './const'

const initialState = {
    status: 'init',
    item: {}
}

export function serverViewReducer(state = initialState, action) {
    switch (action.type) {
        case SERVER_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case SERVER_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                item: action.payload,
            }
        }
        case SERVER_LOAD_ERROR: {
            return {
                ...state,
                status: 'error',
            }
        }

        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
