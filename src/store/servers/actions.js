import {
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
import { client } from '../../api/client'
import axios from 'axios'

export const serversLoad = (id) => {
    return dispatch => {
        dispatch(serversLoadStart())

        axios
            .get(client.getApiUrl() + `/servers?projectId=${id}`)
            .then(res => {
                console.log(res.data)
                dispatch(
                  serversLoadFinish({
                      items: res.data
                  })
                )
            })
            .catch(err => {
                dispatch(serversLoadError(err.message));
            });
    }
}

const serversLoadFinish = res => ({
    type: SERVERS_LOAD_SUCCESS,
    payload: {
      ...res
    }
})

const serversLoadStart = res => ({
    type: SERVERS_LOAD_START,
    payload: {
      ...res
    }
})

const serversLoadError = res => ({
    type: SERVERS_LOAD_ERROR,
    payload: {
      ...res
    }
})

export const serverSave = ({projectId, formId, formHost, formUser, formPassword, formPort}, callback, onError) => {
    return dispatch => {
        dispatch(serverSaveStart())

        axios
            .post(client.getApiUrl() + '/server/save', {
                projectId,
                id: formId,
                host: formHost,
                user: formUser,
                password: formPassword,
                port: formPort,
            })
            .then(res => {
                dispatch(
                  serverSaveFinish({
                      item: res.data,
                      isNew: formId == 0,
                  })
                )

                callback()
            })
            .catch(err => {
                dispatch(serverSaveError())

                onError(err.message)
            });
    }
}

const serverSaveStart = res => ({
    type: SERVER_SAVE_START,
    payload: {
      ...res
    }
})
const serverSaveFinish = res => ({
    type: SERVER_SAVE_SUCCESS,
    payload: {
      ...res
    }
})
const serverSaveError = res => ({
    type: SERVER_SAVE_ERROR,
    payload: {
      ...res
    }
})

export const serverDelete = (id, callback, onError) => {
    return dispatch => {
        dispatch(serverDeleteStart())

        axios
            .post(client.getApiUrl() + '/server/delete', {
                id
            })
            .then(res => {
                dispatch(
                    serverDeleteFinish({id: id})
                )

                callback()
            })
            .catch(err => {
                dispatch(serverDeleteError())

                onError(err.message)
            });
    }
}

const serverDeleteStart = res => ({
    type: SERVER_DELETE_START,
    payload: {
      ...res
    }
})
const serverDeleteFinish = res => ({
    type: SERVER_DELETE_SUCCESS,
    payload: {
      ...res
    }
})
const serverDeleteError = res => ({
    type: SERVER_DELETE_ERROR,
    payload: {
      ...res
    }
})
