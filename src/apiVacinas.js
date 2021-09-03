import axios from 'axios'

const apiVacinas = axios.create({
    baseURL: "http://54.234.77.20:8080/app/vacinas"
})

export default apiVacinas;