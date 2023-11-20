import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL
const CATALYST_CORE_API_URL = process.env.REACT_APP_CATALYST_CORE_API_URL

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    },
})

const axiosCatalystCore = axios.create({
    baseURL: CATALYST_CORE_API_URL,
})

export { axiosCatalystCore }

export { baseURL }
export default axiosInstance
