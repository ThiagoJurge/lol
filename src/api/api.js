import axios from "axios";
//"API WITH FLASK"
const api = axios.create({
    baseURL: 'https://faol.mapa.tecmic.com/RESTAPI',
    //AIzaSyCzWKJLQqvCIW8rzyq5GAVpx4FiKDypDwM
})

class Request {
    constructor() {
        this.getBusList = async function () {
            try {
                const response = await api.get("/Route/OnlyVisible");
                return response.data
            } catch (error) {
                console.log(error);
            }
        }
        this.getActiveRoute = async function (id) {
            try {
                const response = await api.post(`/RouteVariantDirection/GetActiveByRoute?id=${id}`);
                return response.data
            } catch (error) {
                console.log(error);
            }
        }
        this.getBusStop = async function (id) {
            try {
                const response = await api.post(`/BusStopRoute/GetByRVD?id=${id}`);
                return response.data
            } catch (error) {
                console.log(error);
            }

        }
        this.getBusLocation = async function (id) {
            try {
                
                const response = await api.get(`/MobileActualState/Get?route=${id}`)
                return response.data
            } catch (error) {
                console.log(error) 
            }
            
        }
    }
}

export const callApi = new Request()