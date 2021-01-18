class ApiClient {
    getApiUrl () {
        return "http://127.0.0.1:8000/api";
    }
}

export const client = new ApiClient()