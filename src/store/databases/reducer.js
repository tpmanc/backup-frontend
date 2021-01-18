import {
    DATABASES_LOAD_START,
    DATABASES_LOAD_SUCCESS,
    DATABASES_LOAD_ERROR,
    DATABASES_SAVE_START,
    DATABASES_SAVE_SUCCESS,
    DATABASES_SAVE_ERROR,
    DATABASES_DELETE_START,
    DATABASES_DELETE_SUCCESS,
    DATABASES_DELETE_ERROR,
} from './const'

const initialState = {
    status: 'init',
    items: [],
    saveStatus: 'ok',
    deleteStatus: 'ok',
}

export function databasesReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case DATABASES_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case DATABASES_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                items: action.payload.items,
            }
        }
        case DATABASES_LOAD_ERROR: {
            return {
                ...state,
                status: 'error',
            }
        }

        case DATABASES_SAVE_START: {
            return {
                ...state,
                saveStatus: 'processed',
            }
        }
        case DATABASES_SAVE_SUCCESS: {
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
        case DATABASES_SAVE_ERROR: {
            return {
                ...state,
                saveStatus: 'ok',
            }
        }

        case DATABASES_DELETE_START: {
            return {
                ...state,
            }
        }
        case DATABASES_DELETE_SUCCESS: {
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
        case DATABASES_DELETE_ERROR: {
            return {
                ...state,
            }
        }
        
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
