import axios from 'axios';

export default function setAuthorizationToken(token) {
    if (token) {
        localStorage.token = token
        axios.defaults.headers.common['Authorization'] = `${token}`
    } else {
        localStorage.token = ''
        delete axios.defaults.headers.common['Authorization']
    }
}
