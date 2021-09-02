import axios from 'axios'

const apiRelatorios = axios.create({
    baseURL: "http://localhost:8080/app/"
})

export default apiRelatorios;