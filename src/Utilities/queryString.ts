export const parseQueryString = (queryString: string) => {
  if (!queryString) {
    return {};
  }
  if (queryString[0] !== "?") {
    throw Error("Invalid query string");
  }
  const queries = queryString.substr(1).split("&");
  const result: { [key: string]: string } = {};
  queries.forEach(q => {
    const [key, value] = q.split("=");
    result[key] = value;
  });
  return result;
};
