import axios from 'axios'

const apiAllPets = axios.create({
    baseURL: "http://52.3.6.109:8080/app/todos-pets"
})

export default apiAllPets;