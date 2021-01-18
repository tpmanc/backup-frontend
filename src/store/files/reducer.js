import {
    FILES_LOAD_START,
    FILES_LOAD_SUCCESS,
    FILES_LOAD_ERROR,
    FILES_SAVE_START,
    FILES_SAVE_SUCCESS,
    FILES_SAVE_ERROR,
    FILES_DELETE_START,
    FILES_DELETE_SUCCESS,
    FILES_DELETE_ERROR,
} from './const'

const initialState = {
    status: 'init',
    items: [],
    saveStatus: 'ok',
    deleteStatus: 'ok',
}

export function filesReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case FILES_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case FILES_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                items: action.payload.items,
            }
        }
        case FILES_LOAD_ERROR: {
            return {
                ...state,
                status: 'error',
            }
        }

        case FILES_SAVE_START: {
            return {
                ...state,
                saveStatus: 'processed',
            }
        }
        case FILES_SAVE_SUCCESS: {
            if (action.payload.isNew) {
                return {
                    ...state,
                    saveStatus: 'ok',
                    items: [
                        ...state.items,
                        action.payload.item,
                    ],
                }
            } else {
                return {
                    ...state,
                    saveStatus: 'ok',
                    items: state.items.map(item => {
                        if (item.id == action.payload.item.id) {
                            return action.payload.item
                        } else {
                            return item
                        }
                    }),
                }
            }
        }
        case FILES_SAVE_ERROR: {
            return {
                ...state,
                saveStatus: 'ok',
            }
        }

        case FILES_DELETE_START: {
            return {
                ...state,
            }
        }
        case FILES_DELETE_SUCCESS: {
            let newItems = []
            state.items.forEach(item => {
                if (item.id != action.payload.id) {
                    newItems.push(item)
                }
            })
            return {
                ...state,
                items: newItems,
            }
        }
        case FILES_DELETE_ERROR: {
            return {
                ...state,
            }
        }
        
        default:
            return state
    }
}
