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
    DATABASES_RUN_START,
    DATABASES_RUN_SUCCESS,
    DATABASES_RUN_ERROR,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'
  
export const databasesLoad = (serverId) => {
    return dispatch => {
      dispatch(databasesLoadStart())
  
      axios
        .get(client.getApiUrl() + `/databases?serverId=${serverId}`)
        .then(res => {
            console.log(res.data)
            dispatch(
                databasesLoadFinish({
                    status: 'ok',
                    items: res.data,
                })
            )
        })
        .catch(err => {
            dispatch(databasesLoadError(err.message))
        })
    }
}
const databasesLoadStart = res => ({
    type: DATABASES_LOAD_START,
    payload: {
        ...res
    }
})
const databasesLoadFinish = res => ({
    type: DATABASES_LOAD_SUCCESS,
    payload: {
        ...res
    }
})
const databasesLoadError = res => ({
    type: DATABASES_LOAD_ERROR,
    payload: {
        ...res
    }
})


export const databaseSave = ({serverId, id, user, password, database}, callback, errorCallback) => {
    return dispatch => {
        dispatch(
            databaseSaveStart()
        )
  
        axios
            .post(client.getApiUrl() + '/database/save', {
                serverId,
                id,
                user,
                password,
                database,
            })
            .then(res => {
                dispatch(
                    databaseSaveFinish({
                        item: res.data,
                        isNew: id == 0,
                    })
                )
  
                callback()
            })
            .catch(err => {
                dispatch(databaseSaveError())
  
                errorCallback(err.message)
            });
    }
}
const databaseSaveStart = res => ({
    type: DATABASES_SAVE_START,
    payload: {
        ...res
    }
})
const databaseSaveFinish = res => ({
    type: DATABASES_SAVE_SUCCESS,
    payload: {
        ...res
    }
})
const databaseSaveError = res => ({
    type: DATABASES_SAVE_ERROR,
    payload: {
        ...res
    }
})



export const databaseDelete = (id, callback, onError) => {
    return dispatch => {
        dispatch(
            databaseDeleteStart()
        )
  
      axios
        .post(client.getApiUrl() + '/database/delete', {
            id,
        })
        .then(res => {
            dispatch(
                databaseDeleteFinish({
                    id: res.data.id,
                })
            )
  
            callback()
        })
        .catch(err => {
            dispatch(databaseDeleteError())
  
            if (onError !== undefined) {
                onError(err.message)
            }
        })
    }
}
const databaseDeleteStart = res => ({
    type: DATABASES_DELETE_START,
    payload: {
        ...res
    }
})
const databaseDeleteFinish = res => ({
    type: DATABASES_DELETE_SUCCESS,
    payload: {
        ...res
    }
})
const databaseDeleteError = res => ({
    type: DATABASES_DELETE_ERROR,
    payload: {
        ...res
    }
})


export const databaseRun = (id, callback, onError) => {
    return dispatch => {
        dispatch(
            databaseRunStart()
        )
  
      axios
        .post(client.getApiUrl() + '/database/run', {
            id,
        })
        .then(res => {
            dispatch(
                databaseRunFinish({
                    id: res.data.id,
                })
            )
  
            callback()
        })
        .catch(err => {
            dispatch(databaseRunError())
  
            if (onError !== undefined) {
                onError(err.message)
            }
        })
    }
}
const databaseRunStart = res => ({
    type: DATABASES_RUN_START,
    payload: {
        ...res
    }
})
const databaseRunFinish = res => ({
    type: DATABASES_RUN_SUCCESS,
    payload: {
        ...res
    }
})
const databaseRunError = res => ({
    type: DATABASES_RUN_ERROR,
    payload: {
        ...res
    }
})
