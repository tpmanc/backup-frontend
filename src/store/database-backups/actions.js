import {
    DATABASE_BACKUPS_LOAD_START,
    DATABASE_BACKUPS_LOAD_SUCCESS,
    DATABASE_BACKUPS_LOAD_ERROR,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'
  
export const databaseBackupsLoad = (id, callback, onError) => {
    return dispatch => {
      dispatch(databaseBackupsLoadStart())
  
      axios
        .get(client.getApiUrl() + `/database-backups?id=${id}`)
        .then(res => {
            dispatch(
                databaseBackupsLoadFinish({
                    status: 'ok',
                    items: res.data,
                })
            )
            callback()
        })
        .catch(err => {
            dispatch(databaseBackupsLoadError())

            onError(err.message)
        })
    }
}
const databaseBackupsLoadStart = res => ({
    type: DATABASE_BACKUPS_LOAD_START,
    payload: {
        ...res
    }
})
const databaseBackupsLoadFinish = res => ({
    type: DATABASE_BACKUPS_LOAD_SUCCESS,
    payload: {
        ...res
    }
})
const databaseBackupsLoadError = res => ({
    type: DATABASE_BACKUPS_LOAD_ERROR,
    payload: {
        ...res
    }
})
