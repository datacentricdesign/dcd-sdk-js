import  * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class PropertyService {

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
    static async read(thing_id:string,property_id:string,from :number ,to :number,thing_token:string):Promise<any>{
        if (from && to) {
            const readPropertyAPI = api_url+'/things/'+thing_id+'/properties/'+property_id+ '?from=' + from + '&to=' + to;
            return http.GETRequest(readPropertyAPI,thing_token)
        }else {
            return http.GETRequest(api_url+'/things/'+thing_id+'/properties/'+property_id,thing_token)
        }   
    }


    /**
     * function delete a property with his id.
     * @param thing_id 
     * @param property_id 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async delete(thing_id:string,property_id:string,thing_token:string):Promise<any>{
        return http.DELETERequest(api_url+'/things/'+thing_id+'/properties/'+property_id,thing_token)
    }


    /**
     * function create a property with a property in json.
     * @param thing_id 
     * @param property_json 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async create(thing_id:string,property_json:{},thing_token:string):Promise<any>{
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
    static async update(thing_id:string,property_id:string,property_json:{},thing_token:string):Promise<any>{
        return http.PUTRequest(api_url+'/things/'+thing_id+'/properties/'+property_id,thing_token,property_json)
    }

/**
     * function update a property with an array of values and a file.
     * @param thing_id 
     * @param property_id 
     * @param values 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async updatefile(thing_id:string,property_id:string,values:number[],thing_token:string):Promise<any>{
        return http.POSTRequest(api_url+'/things/'+thing_id+'/properties/'+property_id+'/values/'+values.join()+'/file',thing_token,{})
    }



}