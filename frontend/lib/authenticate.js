export function setToken(token) {
    localStorage.setItem('token', token)
}

export function getToken() {
    try {
        return localStorage.getItem('token');
    } catch (error) {
        return null;
    }
}

export function removeToken() {
    localStorage.removeItem('token')
}