import  * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class ThingService {
    
    /**
     * function read all things.
     * @param thing_token
     * @returns {Promise<any>} 
     */
    static async readAll(thing_token:string):Promise<any>{
    return http.GETRequest(api_url+'/things',thing_token)
    }

    /**
     * function read a thing with his id.
     * @param thing_id 
     * @param thing_token
     * @returns {Promise<any>} 
     */
    static async read(thing_id:string,thing_token:string):Promise<any>{
    return http.GETRequest(api_url+'/things/'+thing_id,thing_token)
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
    static async readProperty(thing_id:string,property_id:string,from :number ,to :number,thing_token:string):Promise<any>{
        if (from !== undefined && to !== undefined) {
            const readPropertyAPI = api_url+'/things/'+thing_id+'/properties/'+property_id+ '?from=' + from + '&to=' + to;
            return http.GETRequest(readPropertyAPI,thing_token)
        }else {
            return http.GETRequest(api_url+'/things/'+thing_id+'/properties/'+property_id,thing_token)
        }   
    }

    /**
     * function delete a thing with his id.
     * @param thing_id 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async deleteThing(thing_id:string,thing_token:string):Promise<any>{
        return http.DELETERequest(api_url+'/things/'+thing_id,thing_token)
    }

    /**
     * function delete a property with his id.
     * @param thing_id 
     * @param property_id 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async deleteProperty(thing_id:string,property_id:string,thing_token:string):Promise<any>{
        return http.DELETERequest(api_url+'/things/'+thing_id+'/properties/'+property_id,thing_token)
    }

    /**
     * function create a thing with a thing in json.
     * you can set if you want a jwt in response
     * @param thing_json 
     * @param jwt 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async createThing(thing_json:{},jwt:boolean,thing_token:string):Promise<any>{
        if(jwt!== undefined){
            return http.POSTRequest(api_url+'/things/?jwt='+jwt,thing_token,thing_json)
        }else{
            return http.POSTRequest(api_url+'/things/',thing_token,thing_json)
        }
    }
    
    /**
     * function create a property with a property in json.
     * @param thing_id 
     * @param property_json 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async createProperty(thing_id:string,property_json:{},thing_token:string):Promise<any>{
            return http.POSTRequest(api_url+'/things/'+thing_id+'/properties',thing_token,property_json)
        
    }

    /**
     * function update a property with an array of values.
     * @param thing_id 
     * @param property_id 
     * @param values 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async updateProperty(thing_id:string,property_id:string,values:number[],thing_token:string):Promise<any>{
        return http.POSTRequest(api_url+'/things/'+thing_id+'/properties/'+property_id+'/values/'+values.join()+'/file',thing_token,{})
    }
    
    

}