import { apiUrl } from '../env'

class ApiClient {
    getApiUrl () {
        return `${apiUrl}/api`;
    }
}

export const client = new ApiClient()