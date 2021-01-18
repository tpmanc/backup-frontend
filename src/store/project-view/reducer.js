import { 
    PROJECT_RESET,
    PROJECT_LOAD_START,
    PROJECT_LOAD_SUCCESS,
    PROJECT_LOAD_ERROR,
 } from './const'
 import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
    status: 'init',
    item: {}
}

export function projectViewReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case PROJECT_RESET: {
            return {
                ...state,
                status: 'init',
                item: {},
            }
        }
        case PROJECT_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                item: action.payload,
            }
        }
        case PROJECT_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case PROJECT_LOAD_ERROR: {
            return {
                ...state,
                status: 'error',
            }
        }
        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
