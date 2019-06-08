import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-af40e.firebaseio.com/'
})

export default instance;