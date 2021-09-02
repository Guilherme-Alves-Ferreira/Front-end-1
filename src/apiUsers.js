import axios from 'axios'

const apiUsers = axios.create({
    baseURL: "http://localhost:8080/app/usuarios"
})

export default apiUsers;