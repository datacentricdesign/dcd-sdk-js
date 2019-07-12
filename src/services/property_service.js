"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require("../helpers/http");
var api_url = 'https://dwd.tudelft.nl:443/api';
var PropertyService = /** @class */ (function () {
    function PropertyService() {
    }
    /**
         * function read a property with his id.
         * read also the value from a date to another (timestamp)
         * @param thing_id
         * @param property_id
         * @param from
         * @param to
         * @param thing_token
         * @returns {Promise<any>}
         */
    PropertyService.read = function (thing_id, property_id, from, to, thing_token) {
        return __awaiter(this, void 0, void 0, function () {
            var readPropertyAPI;
            return __generator(this, function (_a) {
                if (from !== undefined && to !== undefined) {
                    readPropertyAPI = api_url + '/things/' + thing_id + '/properties/' + property_id + '?from=' + from + '&to=' + to;
                    return [2 /*return*/, http.GETRequest(readPropertyAPI, thing_token)];
                }
                else {
                    return [2 /*return*/, http.GETRequest(api_url + '/things/' + thing_id + '/properties/' + property_id, thing_token)];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * function delete a property with his id.
     * @param thing_id
     * @param property_id
     * @param thing_token
     * @returns {Promise<any>}
     */
    PropertyService["delete"] = function (thing_id, property_id, thing_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, http.DELETERequest(api_url + '/things/' + thing_id + '/properties/' + property_id, thing_token)];
            });
        });
    };
    /**
     * function create a property with a property in json.
     * @param thing_id
     * @param property_json
     * @param thing_token
     * @returns {Promise<any>}
     */
    PropertyService.create = function (thing_id, property_json, thing_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, http.POSTRequest(api_url + '/things/' + thing_id + '/properties', thing_token, property_json)];
            });
        });
    };
    /**
         * function update a property with an array of values.
         * @param thing_id
         * @param property_id
         * @param values
         * @param thing_token
         * @returns {Promise<any>}
         */
    PropertyService.update = function (thing_id, property_id, property_json, thing_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, http.PUTRequest(api_url + '/things/' + thing_id + '/properties/' + property_id, thing_token, property_json)];
            });
        });
    };
    /**
         * function update a property with an array of values and a file.
         * @param thing_id
         * @param property_id
         * @param values
         * @param thing_token
         * @returns {Promise<any>}
         */
    PropertyService.updatefile = function (thing_id, property_id, values, thing_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, http.POSTRequest(api_url + '/things/' + thing_id + '/properties/' + property_id + '/values/' + values.join() + '/file', thing_token, {})];
            });
        });
    };
    return PropertyService;
}());
exports.PropertyService = PropertyService;