import  * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class ThingService {
    
    /**
     * function read all things.
     * @param thing_token
     * @returns {Promise<any>} 
     */
    static async list(thing_token:string):Promise<any>{
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
     * function delete a thing with his id.
     * @param thing_id 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async delete(thing_id:string,thing_token:string):Promise<any>{
        return http.DELETERequest(api_url+'/things/'+thing_id,thing_token)
    }

    /**
     * function create a thing with a thing in json.
     * you can set if you want a jwt in response
     * @param thing_json 
     * @param jwt 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async create(thing_json:{},jwt:boolean,thing_token:string):Promise<any>{
        /*if(jwt!== undefined){
            return http.POSTRequest(api_url+'/things/?jwt='+jwt,thing_token,thing_json)
        }else{
            return http.POSTRequest(api_url+'/things/',thing_token,thing_json)
        }*/
        if(jwt!== undefined){
            return http.POSTRequestWithTimeOut(api_url+'/things/?jwt='+jwt,thing_token,thing_json,60000)
        }else{
            return http.POSTRequestWithTimeOut(api_url+'/things/',thing_token,thing_json,60000)
        }
    }
    
    

}