import  * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class ThingService {
    
    /**
     * function read all things.
     * @param token
     * @returns {Promise<any>} 
     */
    static async list(token:string):Promise<any>{
    return http.GETRequest(api_url+'/things',token)
    }

    /**
     * function read a thing with his id.
     * @param thing_id 
     * @param token
     * @returns {Promise<any>} 
     */
    static async read(thing_id:string,token:string):Promise<any>{
    return http.GETRequest(api_url+'/things/'+thing_id,token)
    }

    /**
     * function delete a thing with his id.
     * @param thing_id 
     * @param token 
     * @returns {Promise<any>}
     */
    static async delete(thing_id:string,token:string):Promise<any>{
        return http.DELETERequest(api_url+'/things/'+thing_id,token)
    }

    /**
     * function create a thing with a thing in json.
     * you can set if you want a jwt in response
     * @param thing_json 
     * @param jwt 
     * @param token 
     * @returns {Promise<any>}
     */
    static async create(thing_json:{},jwt:boolean,token:string):Promise<any>{
        if(jwt){
            return http.POSTRequestWithTimeOut(api_url+'/things/?jwt='+jwt,token,thing_json,60000)
        }else{
            return http.POSTRequestWithTimeOut(api_url+'/things/',token,thing_json,60000)
        }
    }
    
    

}