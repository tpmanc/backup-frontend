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
    FILES_RUN_START,
    FILES_RUN_SUCCESS,
    FILES_RUN_ERROR,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'
  
export const filesLoad = (serverId, callback, onError) => {
    return dispatch => {
      dispatch(filesLoadStart())
  
      axios
        .get(client.getApiUrl() + `/files?serverId=${serverId}`)
        .then(res => {
            console.log(res.data)
            dispatch(
                filesLoadFinish({
                    status: 'ok',
                    items: res.data,
                })
            )
        })
        .catch(err => {
            dispatch(filesLoadError())

            if (onError !== undefined) {
                onError(err.message)
            }
        })
    }
}
const filesLoadStart = res => ({
    type: FILES_LOAD_START,
    payload: {
        ...res
    }
})
const filesLoadFinish = res => ({
    type: FILES_LOAD_SUCCESS,
    payload: {
        ...res
    }
})
const filesLoadError = res => ({
    type: FILES_LOAD_ERROR,
    payload: {
        ...res
    }
})


export const filesSave = ({serverId, id, path}, callback, onError) => {
    return dispatch => {
        dispatch(
            filesSaveStart()
        )
  
        axios
            .post(client.getApiUrl() + '/files/save', {
                serverId,
                id,
                path,
            })
            .then(res => {
                dispatch(
                    filesSaveFinish({
                        item: res.data,
                        isNew: id == 0,
                    })
                )
  
                callback()
            })
            .catch(err => {
                dispatch(filesSaveError())
  
                onError(err.message)
            });
    }
}
const filesSaveStart = res => ({
    type: FILES_SAVE_START,
    payload: {
        ...res
    }
})
const filesSaveFinish = res => ({
    type: FILES_SAVE_SUCCESS,
    payload: {
        ...res
    }
})
const filesSaveError = res => ({
    type: FILES_SAVE_ERROR,
    payload: {
        ...res
    }
})



export const filesDelete = (id, callback, onError) => {
    return dispatch => {
        dispatch(
            filesDeleteStart()
        )
  
      axios
        .post(client.getApiUrl() + '/files/delete', {
            id,
        })
        .then(res => {
            dispatch(
                filesDeleteFinish({
                    id: res.data.id,
                })
            )
  
            callback()
        })
        .catch(err => {
            dispatch(filesDeleteError())
  
            if (onError !== undefined) {
                onError(err.message)
            }
        })
    }
}
const filesDeleteStart = res => ({
    type: FILES_DELETE_START,
    payload: {
        ...res
    }
})
const filesDeleteFinish = res => ({
    type: FILES_DELETE_SUCCESS,
    payload: {
        ...res
    }
})
const filesDeleteError = res => ({
    type: FILES_DELETE_ERROR,
    payload: {
        ...res
    }
})

export const filesRun = (id, callback, onError) => {
    return dispatch => {
        dispatch(
            filesRunStart()
        )
  
      axios
        .post(client.getApiUrl() + '/files/run', {
            id,
        })
        .then(res => {
            dispatch(
                filesRunFinish({
                    id: res.data.id,
                })
            )
  
            callback()
        })
        .catch(err => {
            dispatch(filesRunError())
  
            if (onError !== undefined) {
                onError(err.message)
            }
        })
    }
}
const filesRunStart = res => ({
    type: FILES_RUN_START,
    payload: {
        ...res
    }
})
const filesRunFinish = res => ({
    type: FILES_RUN_SUCCESS,
    payload: {
        ...res
    }
})
const filesRunError = res => ({
    type: FILES_RUN_ERROR,
    payload: {
        ...res
    }
})
