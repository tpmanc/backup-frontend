import axios from 'axios'
import { jwtHelper } from './jwtHelper'

class AxiosHelper {
    constructor () {}

    getHeaders () {
        let headers = {
            headers: {}
        }
        const token = jwtHelper.getToken()
        if (token !== null) {
            headers['headers']['Authorization'] = `Bearer ${token}`
        }

        return headers
    }

    get (url, onSuccess, onError) {
        axios
            .get(url, this.getHeaders())
            .then(res => {
                if (onSuccess !== undefined) {
                    onSuccess(res)
                }
            })
            .catch(err => {
                if (onError !== undefined) {
                    onError(err)
                }
            })
    }
    post (url, body, onSuccess, onError) {
        axios
            .get(url, body, this.getHeaders())
            .then(res => {
                if (onSuccess !== undefined) {
                    onSuccess()
                }
            })
            .catch(err => {
                if (onError !== undefined) {
                    onError(err.message)
                }
            })
    }
}

export const axiosHelper = new AxiosHelper()