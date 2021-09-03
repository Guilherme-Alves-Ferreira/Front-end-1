import axios from 'axios'

const apiAllPets = axios.create({
    baseURL: "http://54.234.77.20:8080/app/todos-pets"
})

export default apiAllPets;