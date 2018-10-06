import {API_ROOT} from "./Constants";

const post = (url: string = ``, data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  }).then(response => response.json()); // parses response to JSON
};

export default {
  user: {
    login: (credentials: object) => post(`${API_ROOT}/user/login`, credentials)
  }
};
