import axios from 'axios'

const apiRelatorios = axios.create({
    baseURL: "https://52.3.6.109:8080/app/"
})

export default apiRelatorios;