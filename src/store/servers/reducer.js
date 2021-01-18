import {
    SERVERS_INIT,
    SERVERS_LOAD_START,
    SERVERS_LOAD_SUCCESS,
    SERVERS_LOAD_ERROR,
    SERVER_SAVE_START,
    SERVER_SAVE_SUCCESS,
    SERVER_SAVE_ERROR,
    SERVER_DELETE_START,
    SERVER_DELETE_SUCCESS,
    SERVER_DELETE_ERROR,
} from './const'

const initialState = {
    status: 'init',
    items: [],
    saveStatus: 'ok',
}

export function serversReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case SERVERS_INIT: {
            return {
                ...state,
                status: 'init',
            }
        }
        case SERVERS_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case SERVERS_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'loaded',
                items: action.payload.items,
            }
        }
        case SERVERS_LOAD_ERROR: {
            return {
                ...state,
                status: 'error',
            }
        }

        case SERVER_SAVE_START: {
            return {
                ...state,
                saveStatus: 'processed',
            }
        }
        case SERVER_SAVE_SUCCESS: {
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
        case SERVER_SAVE_ERROR: {
            return {
                ...state,
                saveStatus: 'ok',
            }
        }

        case SERVER_DELETE_START: {
            return {
                ...state,
            }
        }
        case SERVER_DELETE_SUCCESS: {
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
        case SERVER_DELETE_ERROR: {
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
