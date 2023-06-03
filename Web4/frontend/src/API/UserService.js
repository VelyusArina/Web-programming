import axios from "axios";
import {BASE_URL} from "./apiconfig";

export default class UserService {
    static async register(username, password) {
        const response = await axios.post(BASE_URL + "/register", {
            username: username,
            password: password
        });
        return response.data;
    }

    static async login(username, password) {
        const response = await axios.post(BASE_URL + "/login", {
            username: username,
            password: password
        });
        return response.data;

    }

}