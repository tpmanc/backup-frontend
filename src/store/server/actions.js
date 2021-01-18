import {
    SERVER_LOAD_START,
    SERVER_LOAD_SUCCESS,
    SERVER_LOAD_ERROR,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'

export const serverLoad = (id, callback, onError) => {
    return dispatch => {
        dispatch(
            serverLoadStart()
        )

        axios
            .get(client.getApiUrl() + `/server/${id}`)
            .then(res => {
                dispatch(serverLoadFinish(res.data))

                callback()
            })
            .catch(err => {
                dispatch(serverLoadError())

                if (onError !== undefined) {
                    onError(err.message)
                }
            });
    }
}
const serverLoadStart = res => ({
    type: SERVER_LOAD_START,
    payload: {
      ...res
    }
})
const serverLoadFinish = res => ({
    type: SERVER_LOAD_SUCCESS,
    payload: {
      ...res
    }
})
const serverLoadError = res => ({
    type: SERVER_LOAD_ERROR,
    payload: {
      ...res
    }
})
