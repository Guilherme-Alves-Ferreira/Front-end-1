import axios from 'axios'

const apiUsers = axios.create({
    baseURL: "http://52.3.6.109:8080/app/usuarios"
})

export default apiUsers;