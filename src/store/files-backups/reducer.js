import {
    FILES_BACKUPS_LOAD_START,
    FILES_BACKUPS_LOAD_SUCCESS,
    FILES_BACKUPS_LOAD_ERROR,
} from './const'

const initialState = {
    status: 'init',
    items: [],
    saveStatus: 'ok',
    deleteStatus: 'ok',
}

export function filesBackupsReducer(state = initialState, action) {
    switch (action.type) {
        case FILES_BACKUPS_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case FILES_BACKUPS_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                items: action.payload.items,
            }
        }
        case FILES_BACKUPS_LOAD_ERROR: {
            return {
                ...state,
                status: 'error',
            }
        }

        default:
            return state
    }
}
