import { stringify } from "./queryString";

export const ResponseType = {
  arrayBuffer: 0,
  blob: 1,
  json: 2,
  text: 3,
  formData: 4,
};

export const cFetch = ({
  url,
  method,
  headers,
  queryParams,
  body,
  responseType = ResponseType.json,
  useCredentials = false,
}) => {
  const options = {
    method: method,
    // by default setting the content-type to be json type
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
  };
  if (useCredentials) options.credentials = "include";
  if (queryParams) {
    url = `${url}?${stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      switch (responseType) {
        case ResponseType.arrayBuffer:
          return res.arrayBuffer();
        case ResponseType.blob:
          return res.blob();
        case ResponseType.formData:
          return res.formData();
        case ResponseType.json:
          return res.json();
        case ResponseType.text:
          return res.text();
        default:
          return res.json();
      }
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return Promise.reject({
          status: res.status,
          ok: false,
          message: json.message,
          body: json,
        });
      });
    }
  });
};
