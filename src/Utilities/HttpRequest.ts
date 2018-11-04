function defaultResponseErrorHandler(response: Response): never {
  throw new Error(
    `Error connecting with server ${response.status}:${response.statusText}`
  );
}
function defaultResponseHandler(response: Response): any {
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}
/**
 * perform a post request
 * @param url the request url
 * @param body body of the request
 */
export async function postAsync<T>(
  url: string,
  body: object,
  handleResponse: (response: Response) => any = defaultResponseHandler
): Promise<T> {
  return fetch(url, {
    body: JSON.stringify(body), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then(handleResponse)
    .then((json: any): T => <T>json)
    .catch(defaultResponseErrorHandler);
}

export async function getAsync<T>(
  url: string,
  params: object,
  handleResponse: (response: Response) => any = defaultResponseHandler
): Promise<T> {
  let fullUrl: string = `${url}?`;
  Object.keys(params).forEach((key: string) => {
    fullUrl += `${key}=${params[key]}`;
  });

  return fetch(fullUrl, {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then(handleResponse)
    .then((json: any): T => <T>json)
    .catch(defaultResponseErrorHandler);
}
