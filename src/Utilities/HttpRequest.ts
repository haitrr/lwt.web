/**
 * perform a post request
 * @param url the request url
 * @param body body of the request
 */
export async function postAsync<T>(url: string, body: object): Promise<T> {
  return fetch(url, {
    body: JSON.stringify(body), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  }).then(
    async (response: Response): Promise<T> =>
      response.json().then((json: any): T => <T>json)
  ); // parses response to JSON
}

export function getAsync(): object {
  return {};
}
