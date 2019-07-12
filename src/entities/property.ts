import { Thing } from './thing'

export class Property {
    proprety_entity: Thing
    property_id: string;
    property_name: string;
    property_description: string;
    property_type: string;
    property_dimensions: any[] = [];
    property_values: any[] = [];
    property_entitiy_id:string;


    constructor(params : {}) {
            this.proprety_entity = params['entity']
            this.property_id = params['id']
            this.property_name = params['name']
            this.property_description = params['description']
            this.property_type = params['type'];
            this.property_dimensions = params['dimensions'];
            this.property_values = params['values'];
            this.property_entitiy_id = params ['entityId']
    }

    json(){
        return {
            id : this.property_id,
            name : this.property_name,
            type : this.property_type,
            description: this.property_description,
            dimensions: this.property_dimensions,
            values : this.property_values,
            entityId : this.property_entitiy_id
        }
    }

    update_values(values:any[]){
        this.property_values = []
        const ts = (new Date()).getTime()
        values.unshift(ts)
        this.property_values.push(values)
        this.proprety_entity.update_property(this)
    }

}

export enum PropertyType{
    ONE_DIMENSION = "ONE_DIMENSION",
    TWO_DIMENSIONS = "TWO_DIMENSIONS",
    THREE_DIMENSIONS = "THREE_DIMENSIONS",
    FOUR_DIMENSIONS = "FOUR_DIMENSIONS",
    FIVE_DIMENSIONS = "FIVE_DIMENSIONS",
    SIX_DIMENSIONS = "SIX_DIMENSIONS",
    SEVEN_DIMENSIONS = "SEVEN_DIMENSIONS",
    EIGHT_DIMENSIONS = "EIGHT_DIMENSIONS",
    NINE_DIMENSIONS = "NINE_DIMENSIONS",
    TEN_DIMENSIONS = "TEN_DIMENSIONS",
    ELEVEN_DIMENSIONS = "ELEVEN_DIMENSIONS",
    TWELVE_DIMENSIONS = "TWELVE_DIMENSIONS",
    ACCELEROMETER = "ACCELEROMETER",
    GYROSCOPE = "GYROSCOPE",
    BINARY = "BINARY",
    MAGNETIC_FIELD = "MAGNETIC_FIELD",
    GRAVITY = "GRAVITY",
    ROTATION_VECTOR = "ROTATION_VECTOR",
    LIGHT = "LIGHT",
    LOCATION = "LOCATION",
    ALTITUDE = "ALTITUDE",
    BEARING = "BEARING",
    SPEED = "SPEED",
    PRESSURE = "PRESSURE",
    PROXIMITY = "PROXIMITY",
    RELATIVE_HUMIDITY = "RELATIVE_HUMIDITY",
    COUNT = "COUNT",
    FORCE = "FORCE",
    TEMPERATURE = "TEMPERATURE",
    STATE = "STATE",
    VIDEO = "VIDEO",
    CLASS = "CLASS"
}
