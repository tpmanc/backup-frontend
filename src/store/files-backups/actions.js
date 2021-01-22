import {
    FILES_BACKUPS_LOAD_START,
    FILES_BACKUPS_LOAD_SUCCESS,
    FILES_BACKUPS_LOAD_ERROR,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'
  
export const filesBackupsLoad = (id, callback, onError) => {
    return dispatch => {
      dispatch(filesBackupsLoadStart())
  
      axios
        .get(client.getApiUrl() + `/files-backups?id=${id}`)
        .then(res => {
            dispatch(
                filesBackupsLoadFinish({
                    status: 'ok',
                    items: res.data,
                })
            )
            callback()
        })
        .catch(err => {
            dispatch(filesBackupsLoadError())

            onError(err.message)
        })
    }
}
const filesBackupsLoadStart = res => ({
    type: FILES_BACKUPS_LOAD_START,
    payload: {
        ...res
    }
})
const filesBackupsLoadFinish = res => ({
    type: FILES_BACKUPS_LOAD_SUCCESS,
    payload: {
        ...res
    }
})
const filesBackupsLoadError = res => ({
    type: FILES_BACKUPS_LOAD_ERROR,
    payload: {
        ...res
    }
})

export const filesBackupsDownloadUrl = (id, callback, onError) => {
    return dispatch => {
    //   dispatch(filesBackupsLoadStart())
  
      axios
        .get(client.getApiUrl() + `/files-backup/download?id=${id}`, {headers: {responseType: 'blob',}})
        .then(res => {
            console.log(res.data)
            // dispatch(
            //     filesBackupsLoadFinish({
            //         status: 'ok',
            //         items: res.data,
            //     })
            // )
            callback()
        })
        .catch(err => {
            // dispatch(filesBackupsLoadError())

            onError(err.message)
        })
    }
}
