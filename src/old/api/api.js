import axios from "axios";
//"API WITH FLASK"
const api = axios.create({
    baseURL: 'https://faol.mapa.tecmic.com/RESTAPI/',
    //AIzaSyCzWKJLQqvCIW8rzyq5GAVpx4FiKDypDwM
})

export default api  