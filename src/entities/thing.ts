import { Property } from './property'
import { PropertyType } from './property'
import { ThingService } from '../services/thing_service'
import { PropertyService } from '../services/property_service'

export class Thing {
     thing_id: string;
     thing_token: string;
     thing_name: string;
     thing_description: string;
     thing_type: string
     thing_pem: string
     thing_properties: Property[] = [];
    
    constructor(params : {}) {
        if(!params){
            throw new TypeError('Thing : constructor param is undefined or null')
        }else{
        this.thing_id = params['id']
        this.thing_token = params['token']
        this.thing_name = params['name']
        this.thing_description = params['description']
        this.thing_type = params['type']
        this.thing_pem = params['pem']

        if(params['properties'] instanceof Array){
            params['properties'].forEach(property => {
                if(property instanceof Property){
                    this.thing_properties.push(property)
                }else{
                    if(property.constructor === {}.constructor){
                        this.thing_properties.push(new Property({
                            entity : this, 
                            id : property['id'],
                            name : property['name'],
                            description : property['description'],
                            type : property['type'],
                            dimensions : property['dimensions'],
                            values : property['values'],
                            entityId : property['entityId']
                        }
                        ))
                    }
                }
            })
        }
    }
    }

    async read(): Promise<void>{
        const result = await ThingService.read(this.thing_id,this.thing_token)
        if(!result.thing){
            throw new TypeError('body is undifined or null : no thing found, check if the id and token of your thing are valid')
        }else{
            this.thing_name = result.thing['name']
            this.thing_description = result.thing['description']
            this.thing_type =  result.thing['type']
            this.update_properties(this.array_to_properties(result.thing.properties))
            return
        }
    }

    json():{}{
        return {
            id : this.thing_id,
            name : this.thing_name,
            type : this.thing_type,
            description: this.thing_description,
            properties : this.properties_to_array(),
            pem: this.thing_pem
        };
    }

    async find_or_create_property(property_name:string,property_type:PropertyType):Promise<Property>{
        if(this.find_property_by_name(property_name) == undefined){
            const res = await this.create_property(property_name,property_type)
            return res;
        }else{
            return this.find_property_by_name(property_name)
        }
    }

    private async create_property(property_name:string,property_type:PropertyType):Promise<Property>{
        var prop = new Property({
            name : property_name,
            type : property_type,
        })
        const result = await PropertyService.create(this.thing_id, prop.json(), this.thing_token)
        const prop_res : Property = new Property({
            entity : this,
            id :   result.property.id,
            name : result.property.name,
            description : result.property.description,
            type : result.property.type,
            dimensions : result.property.dimensions,
            values : result.property.values
        })
        this.thing_properties.push(prop_res)
        return prop_res
    }

    private properties_to_array():Array<any>{
        var res = []
        for (var i = 0; i <= this.thing_properties.length; i ++) {
            if(i < this.thing_properties.length){
                const property = this.thing_properties[i]
                res.push(property.json())
            }else{
                return res
            }
          }
    }

    private array_to_properties(array:Array<any>):Array<Property>{
        var res = []
        for (var i = 0; i <= array.length; i ++) {
            if(i < array.length){
                const property = array[i]
                if(property.constructor === {}.constructor){
                res.push(new Property({
                    entity : this,
                    id :   property.id,
                    name : property.name,
                    description : property.description,
                    type : property.type,
                    dimensions : property.dimensions,
                    values : property.values
                }))
                }
           }else{
            return res
            }
        }
    }

    update_property(property:Property){
        this.update_property_http(property)
        if(!this.contains(property.property_id)){
            this.thing_properties.push(property)
        }
    }

    private async update_property_http(property:Property){
        const result = await PropertyService.update(this.thing_id,property.property_id,property.json(),this.thing_token)
        console.log('update property',result)
    }

    private update_properties(properties:Array<Property>){
        properties.forEach(property => {
                    if(!this.contains(property.property_id)){
                        this.thing_properties.push(property)
                    }else{
                        console.log(property.property_id,'already there')
                    }
        })
    }

    private contains(property_id:string):boolean{
        for (var i = 0; i <= this.thing_properties.length; i ++) {
            if(i < this.thing_properties.length){
                if(property_id == this.thing_properties[i].property_id){
                    return true
                }
            }else{
                return false
            }
          }
    }

    private find_property_by_name(property_name:string): Property{
        for (var i = 0; i <= this.thing_properties.length; i ++) {
            if(i < this.thing_properties.length){
                if(property_name == this.thing_properties[i].property_name){
                    return this.thing_properties[i]
                }
            }else{
                return undefined
            }
          }
    }
}
