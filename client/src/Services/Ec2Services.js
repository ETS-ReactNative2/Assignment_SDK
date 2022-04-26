import axios from "axios";
const USER_BASE_URL = "http://54.242.142.78:3500/ec2";
const headers = {
    "Content-Type": "application/json",
};

class EC2Service {
    getInstance() {
        return axios.get(USER_BASE_URL + "/list");
    }
    changeStatus(state, id) {
        return axios.get(USER_BASE_URL + '/state/' + state + '/' + id);
    }
    createInstance(data) {
        return axios.post(USER_BASE_URL + "/create", data, { headers: headers })
    }
    terminateInstance(id) {
        return axios.delete(USER_BASE_URL + "/terminate/" + id)
    }
}

export default new EC2Service();