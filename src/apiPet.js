import axios from 'axios'

const apiPets = axios.create({
    baseURL: "http://52.3.6.109:8080/app/pets"
})

export default apiPets;