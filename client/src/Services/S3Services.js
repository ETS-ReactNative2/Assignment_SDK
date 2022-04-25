import axios from 'axios'

const USER_BASE_URL = 'http://localhost:3500/s3'

const headers = {
    'Content-Type': 'application/json'
}

class UserService {
    getBuckets() {
        return axios.get(USER_BASE_URL + '/list')
    }
    createBucket(data) {
        return axios.post(USER_BASE_URL + '/create', data, { headers: headers });
    }
    deleteBucket(name) {
        return axios.delete(USER_BASE_URL + '/delete/' + name);
    }
    getObjects(name) {
        return axios.get(USER_BASE_URL + '/listobj/' + name);
    }
}

export default new UserService()