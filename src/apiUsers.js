import axios from 'axios'

const apiUsers = axios.create({
    baseURL: "http://54.234.77.20:8080/app/usuarios"
})

export default apiUsers;