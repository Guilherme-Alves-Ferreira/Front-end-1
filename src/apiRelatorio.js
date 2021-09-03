import axios from 'axios'

const apiRelatorios = axios.create({
    baseURL: "http://54.234.77.20:8080/app/"
})

export default apiRelatorios;