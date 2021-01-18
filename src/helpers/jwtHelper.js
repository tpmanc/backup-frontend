class JwtHelper {
    constructor () {
        this.tokenKey = 'jwtToken'
    }

    setToken (value) {
        localStorage.setItem(this.tokenKey, value)
    }
    getToken () {
        return localStorage.getItem(this.tokenKey)
    }
    removeToken () {
        localStorage.removeItem(this.tokenKey)
    }
}

export const jwtHelper = new JwtHelper()
