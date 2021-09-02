import axios from 'axios'

const apiVacinas = axios.create({
    baseURL: "http://localhost:8080/app/vacinas"
})

export default apiVacinas;