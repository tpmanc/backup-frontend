import {
    DATABASE_BACKUPS_LOAD_START,
    DATABASE_BACKUPS_LOAD_SUCCESS,
    DATABASE_BACKUPS_LOAD_ERROR,
} from './const'

const initialState = {
    status: 'init',
    items: [],
    saveStatus: 'ok',
    deleteStatus: 'ok',
}

export function databaseBackupsReducer(state = initialState, action) {
    switch (action.type) {
        case DATABASE_BACKUPS_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case DATABASE_BACKUPS_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                items: action.payload.items,
            }
        }
        case DATABASE_BACKUPS_LOAD_ERROR: {
            return {
                ...state,
                status: 'error',
            }
        }

        default:
            return state
    }
}
