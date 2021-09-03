import axios from 'axios'

const apiPets = axios.create({
    baseURL: "http://54.234.77.20:8080/app/pets"
})

export default apiPets;