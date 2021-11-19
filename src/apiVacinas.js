import axios from 'axios'

const apiVacinas = axios.create({
    baseURL: "http://52.3.6.109:8080/app/vacinas"
})

export default apiVacinas;