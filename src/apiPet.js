import axios from 'axios'

const apiPets = axios.create({
    baseURL: "http://localhost:8080/app/pets"
})

export default apiPets;