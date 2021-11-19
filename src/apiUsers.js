import axios from 'axios'

const apiUsers = axios.create({
    baseURL: "https://52.3.6.109:8443/app/usuarios"
})

export default apiUsers;