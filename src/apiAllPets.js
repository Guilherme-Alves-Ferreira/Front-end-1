import axios from 'axios'

const apiAllPets = axios.create({
    baseURL: "http://localhost:8080/app/todos-pets"
})

export default apiAllPets;