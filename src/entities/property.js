"use strict";
exports.__esModule = true;
var Property = /** @class */ (function () {
    function Property(params) {
        this.property_dimensions = [];
        this.property_values = [];
        this.proprety_entity = params['entity'];
        this.property_id = params['id'];
        this.property_name = params['name'];
        this.property_description = params['description'];
        this.property_type = params['type'];
        this.property_dimensions = params['dimensions'];
        this.property_values = params['values'];
        this.property_entitiy_id = params['entityId'];
    }
    Property.prototype.json = function () {
        return {
            id: this.property_id,
            name: this.property_name,
            type: this.property_type,
            description: this.property_description,
            dimensions: this.property_dimensions,
            values: this.property_values,
            entityId: this.property_entitiy_id
        };
    };
    Property.prototype.update_values = function (values) {
        this.property_values = [];
        var ts = (new Date()).getTime();
        values.unshift(ts);
        this.property_values.push(values);
        this.proprety_entity.update_property(this);
    };
    return Property;
}());
exports.Property = Property;
var PropertyType;
(function (PropertyType) {
    PropertyType["ONE_DIMENSION"] = "ONE_DIMENSION";
    PropertyType["TWO_DIMENSIONS"] = "TWO_DIMENSIONS";
    PropertyType["THREE_DIMENSIONS"] = "THREE_DIMENSIONS";
    PropertyType["FOUR_DIMENSIONS"] = "FOUR_DIMENSIONS";
    PropertyType["FIVE_DIMENSIONS"] = "FIVE_DIMENSIONS";
    PropertyType["SIX_DIMENSIONS"] = "SIX_DIMENSIONS";
    PropertyType["SEVEN_DIMENSIONS"] = "SEVEN_DIMENSIONS";
    PropertyType["EIGHT_DIMENSIONS"] = "EIGHT_DIMENSIONS";
    PropertyType["NINE_DIMENSIONS"] = "NINE_DIMENSIONS";
    PropertyType["TEN_DIMENSIONS"] = "TEN_DIMENSIONS";
    PropertyType["ELEVEN_DIMENSIONS"] = "ELEVEN_DIMENSIONS";
    PropertyType["TWELVE_DIMENSIONS"] = "TWELVE_DIMENSIONS";
    PropertyType["ACCELEROMETER"] = "ACCELEROMETER";
    PropertyType["GYROSCOPE"] = "GYROSCOPE";
    PropertyType["BINARY"] = "BINARY";
    PropertyType["MAGNETIC_FIELD"] = "MAGNETIC_FIELD";
    PropertyType["GRAVITY"] = "GRAVITY";
    PropertyType["ROTATION_VECTOR"] = "ROTATION_VECTOR";
    PropertyType["LIGHT"] = "LIGHT";
    PropertyType["LOCATION"] = "LOCATION";
    PropertyType["ALTITUDE"] = "ALTITUDE";
    PropertyType["BEARING"] = "BEARING";
    PropertyType["SPEED"] = "SPEED";
    PropertyType["PRESSURE"] = "PRESSURE";
    PropertyType["PROXIMITY"] = "PROXIMITY";
    PropertyType["RELATIVE_HUMIDITY"] = "RELATIVE_HUMIDITY";
    PropertyType["COUNT"] = "COUNT";
    PropertyType["FORCE"] = "FORCE";
    PropertyType["TEMPERATURE"] = "TEMPERATURE";
    PropertyType["STATE"] = "STATE";
    PropertyType["VIDEO"] = "VIDEO";
    PropertyType["CLASS"] = "CLASS";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
