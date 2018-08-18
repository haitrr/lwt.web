import axios from "axios";
import constants from "./constants";

export default {
  user: {
    login: credentials => axios.post(`${constants.API_ROOT}/user/login`, credentials)
  }
};
