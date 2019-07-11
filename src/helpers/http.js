"use strict";
exports.__esModule = true;
var fetch = require("node-fetch");
/**
 * A small helper function to make a GET request to the api.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @returns {Promise<>}
 */
exports.GETRequest = function (url, authorization) { return fetch(url, {
    headers: {
        Authorization: 'bearer ' + authorization,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}).then(function (res) {
    if (res.ok) {
        try {
            return Promise.resolve(res.json());
        }
        catch (e) {
            return Promise.resolve(res.text());
        }
    }
    else {
        return Promise.resolve(res.text());
    }
})["catch"](function (err) { throw err; }); };
/**
 * A small helper function to make a POST request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
exports.POSTRequest = function (url, authorization, body) {
    var params = {
        headers: {
            Authorization: 'bearer ' + authorization,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST'
    };
    if (body !== undefined) {
        var bodyStr = JSON.stringify(body);
        params.headers['Content-length'] = bodyStr.length;
        params['body'] = bodyStr;
    }
    return fetch(url, params)
        .then(function (res) {
        if (res.ok) {
            try {
                return Promise.resolve(res.json());
            }
            catch (e) {
                return Promise.resolve(res.text());
            }
        }
        else {
            return Promise.resolve(res.text());
        }
    })["catch"](function (err) { throw err; });
    //.catch(err => console.log(err));
};
/**
 * A small helper function to make a POST request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
exports.PUTRequest = function (url, authorization, body) {
    var params = {
        headers: {
            Authorization: 'bearer ' + authorization,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'PUT'
    };
    if (body !== undefined) {
        var bodyStr = JSON.stringify(body);
        params.headers['Content-length'] = bodyStr.length;
        params['body'] = bodyStr;
    }
    return fetch(url, params)
        .then(function (res) {
        if (res.ok) {
            try {
                return Promise.resolve(res.json());
            }
            catch (e) {
                return Promise.resolve(res.text());
            }
        }
        else {
            return Promise.resolve(res.text());
        }
    })["catch"](function (err) { throw err; });
    //.catch(err => console.log(err));
};
/**
 * A small helper function to make a DELETE request to the backend.
 * It includes a bearer token in the request header.
 * @param url
 * @param authorization
 * @param body
 * @returns {Promise<>}
 */
exports.DELETERequest = function (url, authorization) {
    var params = {
        headers: {
            Authorization: 'bearer ' + authorization,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'DELETE'
    };
    return fetch(url, params)
        .then(function (res) {
        if (res.ok) {
            try {
                return Promise.resolve(res.json());
            }
            catch (e) {
                return Promise.resolve(res.text());
            }
        }
        else {
            return Promise.resolve(res.text());
        }
    })["catch"](function (err) { throw err; });
    //.catch(err => console.log(err));
};
