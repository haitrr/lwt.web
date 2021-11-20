import { toast } from "react-toastify";
import { TOKEN_LOCAL_STORAGE_KEY } from "../Constants";

function defaultResponseErrorHandler(response: any) {
  if (
    response.status === 404 ||
    response.status === 502 ||
    response.status === 503
  ) {
      toast.error("Failed to connect to server, please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  } else if (response.status === 400) {
    response.json().then((error: any) => {
      toast.error(error.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }).catch(() => {
      toast.error("Bad request", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    });
  } else {
    toast.error(`Error connecting with server ${response.status}:${response.statusText}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  throw response;
}
async function defaultResponseHandler(response: Response) {
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      return null;
    }
  } else {
    throw response;
  }
}

function getAuthenticationHeader() {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (token != null) {
    return { Authorization: `bearer ${token}` };
  }

  return null;
}

/**
 * perform a post request
 * @param url the request url
 * @param body body of the request
 * @param handleResponse response handler
 */
export async function postAsync(
  url: string,
  body: object,
  handleResponse = defaultResponseHandler
) {
  return fetch(url, {
    body: JSON.stringify(body), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "include", // include, same-origin, *omit
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

export async function putAsync(
  url: string,
  id: number | string,
  body: object,
  handleResponse = defaultResponseHandler
) {
  return fetch(`${url}/${id}`, {
    body: JSON.stringify(body), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "include", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthenticationHeader()
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then(handleResponse)
    .catch(defaultResponseErrorHandler);
}

export async function getAsync(
  url: string,
  params?: {[key: string]: string | number},
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
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "include", // include, same-origin, *omit
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

export async function deleteAsync(
  url: string,
  params?: {[key: string]: string},
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
    // credentials: "include", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthenticationHeader()
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then(handleResponse)
    .catch(defaultResponseErrorHandler);
}

export async function patchAsync(
  url: string,
  id: number,
  field: string,
  body: object,
  handleResponse = defaultResponseHandler
) {
  return fetch(`${url}/${id}/${field}`, {
    body: JSON.stringify(body), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "include", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthenticationHeader()
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then(handleResponse)
    .catch(defaultResponseErrorHandler);
}
