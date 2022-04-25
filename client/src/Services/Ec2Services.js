import axios from "axios";
const USER_BASE_URL = "http://localhost:3500/ec2";
const headers = {
    "Content-Type": "application/json",
};

class EC2Service {
    getInstance() {
        return axios.get(USER_BASE_URL + "/list");
    }
    stopInstance(id) {
        return axios.get(USER_BASE_URL + "/stop/" + id)
    }
    stopInstance(id) {
        return axios.get(USER_BASE_URL + "/start/" + id)
    }
    createInstance(data){
        return axios.post(USER_BASE_URL + "/create", data, {headers:headers})
    }
    terminateInstance(id){
        return axios.delete(USER_BASE_URL + "/terminate/" + id)
    }
}

export default new EC2Service();