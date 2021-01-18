import {
    PROJECTS_INIT,
    PROJECTS_LOAD_START,
    PROJECTS_LOAD_SUCCESS,
    PROJECTS_SAVE_START,
    PROJECTS_SAVE_SUCCESS,
    PROJECTS_SAVE_ERROR,
    PROJECTS_DELETE_START,
    PROJECTS_DELETE_SUCCESS,
    PROJECTS_DELETE_ERROR,
} from './const'

const initialState = {
    status: 'init',
    items: [],
    saveStatus: 'ok',
    deleteStatus: 'ok',
}

export function projectsReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case PROJECTS_INIT: {
            return {
                ...state,
                status: 'init',
            }
        }
        case PROJECTS_LOAD_START: {
            return {
                ...state,
                status: 'loading',
            }
        }
        case PROJECTS_LOAD_SUCCESS: {
            return {
                ...state,
                status: 'success',
                items: action.payload.items,
            }
        }

        case PROJECTS_SAVE_START: {
            return {
                ...state,
                saveStatus: 'processing',
            }
        }
        case PROJECTS_SAVE_SUCCESS: {
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
        case PROJECTS_SAVE_ERROR: {
            return {
                ...state,
                saveStatus: 'ok',
            }
        }

        case PROJECTS_DELETE_START: {
            return {
                ...state,
                deleteStatus: 'processing',
            }
        }
        case PROJECTS_DELETE_SUCCESS: {
            let newItems = []
            state.items.forEach(item => {
                if (item.id != action.payload.id) {
                    newItems.push(item)
                }
            })
            return {
                ...state,
                deleteStatus: 'ok',
                items: newItems,
            }
        }
        case PROJECTS_DELETE_ERROR: {
            return {
                ...state,
                deleteStatus: 'ok',
            }
        }
        
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
