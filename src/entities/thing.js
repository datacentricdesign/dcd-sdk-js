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
var property_1 = require("./property");
var http = require("../helpers/http");
var thing_service_1 = require("../services/thing_service");
var api_url = 'https://dwd.tudelft.nl/api';
var Thing = /** @class */ (function () {
    function Thing(params) {
        var _this = this;
        this.thing_properties = [];
        if (params === undefined) {
            throw new TypeError('Thing : constructor param is undefined');
        }
        else {
            this.thing_id = params['thing_id'];
            this.thing_token = params['thing_token'];
            this.thing_name = params['thing_name'];
            this.thing_description = params['thing_description'];
            this.thing_type = params['thing_type'];
            if (params['thing_properties'] instanceof Array) {
                params['thing_properties'].forEach(function (property) {
                    if (property instanceof property_1.Property) {
                        _this.thing_properties.push(property);
                    }
                    else {
                        if (property.constructor === {}.constructor) {
                            _this.thing_properties.push(new property_1.Property({
                                property_entity: _this,
                                property_id: property['id'],
                                property_name: property['name'],
                                property_description: property['description'],
                                property_type: property['type'],
                                property_dimensions: property['dimensions'],
                                property_values: property['values']
                            }));
                        }
                    }
                });
            }
        }
    }
    Thing.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, thing_service_1.ThingService.read(this.thing_id, this.thing_token)];
                    case 1:
                        result = _a.sent();
                        if (result.thing === undefined) {
                            throw new TypeError('body is undifined : no thing found, check if the id and token of your thing are valid');
                        }
                        else {
                            this.thing_name = result.thing['name'];
                            this.thing_description = result.thing['description'];
                            this.thing_type = result.thing['type'];
                            this.update_properties(this.array_to_properties(result.thing.properties)); // this has to be update_property : check if a property exist
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Thing.prototype.json = function () {
        return {
            id: this.thing_id,
            name: this.thing_name,
            type: this.thing_type,
            description: this.thing_description,
            properties: this.properties_to_array()
        };
    };
    Thing.prototype.find_or_create_property = function (property_name, property_type) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.find_property_by_name(property_name) == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.create_property(property_name, property_type)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2: return [2 /*return*/, this.find_property_by_name(property_name)];
                }
            });
        });
    };
    Thing.prototype.create_property = function (property_name, property_type) {
        return __awaiter(this, void 0, void 0, function () {
            var prop, result, prop_res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prop = new property_1.Property({
                            property_name: property_name,
                            property_type: property_type
                        });
                        return [4 /*yield*/, http.POSTRequest(api_url + '/things/' + this.thing_id + '/properties', this.thing_token, prop.json())];
                    case 1:
                        result = _a.sent();
                        prop_res = new property_1.Property({
                            property_entity: this,
                            property_id: result.property.id,
                            property_name: result.property.name,
                            property_description: result.property.description,
                            property_type: result.property.type,
                            property_dimensions: result.property.dimensions,
                            property_values: result.property.values
                        });
                        this.thing_properties.push(prop_res);
                        return [2 /*return*/, prop_res];
                }
            });
        });
    };
    Thing.prototype.properties_to_array = function () {
        var res = [];
        for (var i = 0; i <= this.thing_properties.length; i++) {
            if (i < this.thing_properties.length) {
                var property = this.thing_properties[i];
                res.push(property.json());
            }
            else {
                return res;
            }
        }
    };
    Thing.prototype.array_to_properties = function (array) {
        var res = [];
        for (var i = 0; i <= array.length; i++) {
            if (i < array.length) {
                var property = array[i];
                if (property.constructor === {}.constructor) {
                    res.push(new property_1.Property({
                        property_entity: this,
                        property_id: property.id,
                        property_name: property.name,
                        property_description: property.description,
                        property_type: property.type,
                        property_dimensions: property.dimensions,
                        property_values: property.values
                    }));
                }
            }
            else {
                return res;
            }
        }
    };
    Thing.prototype.update_property = function (property) {
        this.update_property_http(property);
        if (!this.contains(property.property_id)) {
            this.thing_properties.push(property);
        }
        else {
            console.log(property.property_id, 'already there');
        }
    };
    Thing.prototype.update_property_http = function (property) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Thing.prototype.update_properties = function (properties) {
        var _this = this;
        properties.forEach(function (property) {
            if (!_this.contains(property.property_id)) {
                _this.thing_properties.push(property);
            }
            else {
                console.log(property.property_id, 'already there');
            }
        });
    };
    Thing.prototype.contains = function (property_id) {
        for (var i = 0; i <= this.thing_properties.length; i++) {
            if (i < this.thing_properties.length) {
                if (property_id == this.thing_properties[i].property_id) {
                    return true;
                }
            }
            else {
                return false;
            }
        }
    };
    Thing.prototype.find_property_by_name = function (property_name) {
        var res;
        for (var i = 0; i <= this.thing_properties.length; i++) {
            if (i < this.thing_properties.length) {
                if (property_name == this.thing_properties[i].property_name) {
                    //res = this.thing_properties[i]
                    return this.thing_properties[i];
                }
            }
            else {
                return res;
            }
        }
    };
    return Thing;
}());
exports.Thing = Thing;
