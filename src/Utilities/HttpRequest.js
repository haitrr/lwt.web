import { TOKEN_LOCAL_STORAGE_KEY } from "../Constants";
import { notification } from "antd";

function defaultResponseErrorHandler(response) {
  notification.error({ message: "Failed to connect to server." });
  throw new Error(
    `Error connecting with server ${response.status}:${response.statusText}`
  );
}
function defaultResponseHandler(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

function getAuthenticationHeader() {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (token != null) {
    return { Authorization: `bearer ${token}` };
  }

  return {};
}

/**
 * perform a post request
 * @param url the request url
 * @param body body of the request
 * @param handleResponse response handler
 */
export async function postAsync(
  url,
  body,
  handleResponse = defaultResponseHandler
) {
  return fetch(url, {
    body: JSON.stringify(body), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "include", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthenticationHeader()
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then(handleResponse)
    .catch(defaultResponseErrorHandler);
}

export async function getAsync(
  url,
  params,
  handleResponse = defaultResponseHandler
) {
  let fullUrl = url;
  if (params != null) {
    fullUrl += "?";
    Object.keys(params).forEach(key => {
      if (params[key] != null) {
        fullUrl += `${key}=${params[key]}&`;
      }
    });
  }

  return fetch(fullUrl, {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "include", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthenticationHeader()
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then(handleResponse)
    .catch(defaultResponseErrorHandler);
}
