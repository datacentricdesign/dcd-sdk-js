import * as fetch from 'node-fetch';
import AbortController from 'abort-controller';

/**
 * Merge a specified header before fetching request
 * @param url
 * @param authorization
 * @param headers
 * @returns {Promise<>}
 */
const mergeHeadersAndFetch = (url, authorization, headers = {}) => {
  const finalHeaders = headers;
  finalHeaders['Authorization'] = 'bearer ' + authorization;
  finalHeaders['Content-Type'] = 'application/json';
  if (finalHeaders['Accept'] === undefined) {
    finalHeaders['Accept'] = 'application/json';
  }
  return fetch(url, {
    headers: finalHeaders
  });
};

/**
 * A small helper function to make a GET request to the api.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @returns {Promise<>}
 */
export const GETRequest = (url, authorization, headers = {}) =>
  mergeHeadersAndFetch(url, authorization, headers)
    .then((res) => {
      if (res.ok) {
        try {
          return Promise.resolve(res.json());
        } catch (e) {
          return Promise.resolve(res.text());
        }
      } else {
        return Promise.resolve(res.text());
      }
    })
    .catch((err) => {
      throw err;
    });

/**
 * A small helper function to make a POST request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
export const POSTRequest = (url: string, authorization: string, body: {}) => {
  const params = {
    headers: {
      Authorization: 'bearer ' + authorization,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST'
  };
  if (body) {
    const bodyStr = JSON.stringify(body);
    params.headers['Content-length'] = bodyStr.length;
    params['body'] = bodyStr;
  }
  return fetch(url, params)
    .then((res) => {
      if (res.ok) {
        try {
          return Promise.resolve(res.json());
        } catch (e) {
          return Promise.resolve(res.text());
        }
      } else {
        return Promise.resolve(res.text());
      }
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * A small helper function to make a POST request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
export const POSTRequestEncoded = (
  url: string,
  authorization: string,
  body: string
) => {
  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'Content-length': body.length
    },
    method: 'POST',
    body: body
  };
  return fetch(url, params)
    .then((res) => {
      if (res.ok) {
        try {
          return Promise.resolve(res.json());
        } catch (e) {
          return Promise.resolve(res.text());
        }
      } else {
        return Promise.resolve(res.text());
      }
    })
    .catch((err) => {
      return Promise.resolve(err);
    });
};

/**
 * A small helper function to make a POST request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
export const PUTRequest = (url: string, authorization: string, body: {}) => {
  const params = {
    headers: {
      Authorization: 'bearer ' + authorization,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'PUT'
  };
  if (body) {
    const bodyStr = JSON.stringify(body);
    params.headers['Content-length'] = bodyStr.length;
    params['body'] = bodyStr;
  }
  return fetch(url, params)
    .then((res) => {
      if (res.ok) {
        try {
          return Promise.resolve(res.json());
        } catch (e) {
          return Promise.resolve(res.text());
        }
      } else {
        return Promise.resolve(res.text());
      }
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * A small helper function to make a DELETE request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
export const DELETERequest = (url: string, authorization: string) => {
  const params = {
    headers: {
      Authorization: 'bearer ' + authorization,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'DELETE'
  };
  return fetch(url, params)
    .then((res) => {
      if (res.ok) {
        try {
          return Promise.resolve(res.json());
        } catch (e) {
          return Promise.resolve(res.text());
        }
      } else {
        return Promise.resolve(res.text());
      }
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * A small helper function to make a POST request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
export const POSTRequestWithTimeOut = (
  url: string,
  authorization: string,
  body: {},
  time: number
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, time);

  const params = {
    headers: {
      Authorization: 'bearer ' + authorization,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST',
    signal: controller.signal
  };
  if (body) {
    const bodyStr = JSON.stringify(body);
    params.headers['Content-length'] = bodyStr.length;
    params['body'] = bodyStr;
  }
  return fetch(url, params)
    .then((res) => {
      if (res.ok) {
        try {
          return Promise.resolve(res.json());
        } catch (e) {
          return Promise.resolve(res.text());
        }
      } else {
        return Promise.resolve(res.text());
      }
    })
    .finally(() => {
      clearTimeout(timeout);
    })
    .catch((err) => {
      throw err;
    });
};

export const GETRequestWithBody = (
  url: string,
  authorization: string,
  body: {}
) => {
  const params = {
    headers: {
      Authorization: 'bearer ' + authorization,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  };
  if (body) {
    const bodyStr = JSON.stringify(body);
    params.headers['Content-length'] = bodyStr.length;
    params['body'] = bodyStr;
  }
  return fetch(url, params)
    .then((res) => {
      if (res.ok) {
        try {
          return Promise.resolve(res.json());
        } catch (e) {
          return Promise.resolve(res.text());
        }
      } else {
        return Promise.resolve(res.text());
      }
    })
    .catch((err) => {
      throw err;
    });
};
