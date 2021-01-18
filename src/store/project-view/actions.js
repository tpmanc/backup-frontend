import {
    PROJECT_LOAD_START,
    PROJECT_LOAD_SUCCESS,
    PROJECT_LOAD_ERROR,
    PROJECT_RESET,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'

export const projectReset = res => ({
    type: PROJECT_RESET,
    payload: {
        ...res
    }
})

export const projectLoad = (id, callback, errorCallback) => {
    return dispatch => {
        dispatch(
            projectLoadStart()
        )

        axios
            .get(client.getApiUrl() + `/project/${id}`)
            .then(res => {
                dispatch(projectLoadFinish(res.data))

                callback()
            })
            .catch(err => {
                dispatch(projectLoadError())

                if (errorCallback !== undefined) {
                    errorCallback(err.message)
                }
            });
    }
}

const projectLoadStart = res => ({
    type: PROJECT_LOAD_START,
    payload: {
      ...res
    }
})

const projectLoadFinish = res => ({
    type: PROJECT_LOAD_SUCCESS,
    payload: {
      ...res
    }
})

const projectLoadError = res => ({
    type: PROJECT_LOAD_ERROR,
    payload: {
      ...res
    }
})
