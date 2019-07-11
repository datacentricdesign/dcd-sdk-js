import  * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class ThingService {

    static async readAll(thing_token:string):Promise<any>{
    return http.GETRequest(api_url+'/things',thing_token)
    }

    static async read(thing_id:string,thing_token:string):Promise<any>{
    return http.GETRequest(api_url+'/things/'+thing_id,thing_token)
    }

    static async readProperty(thing_id:string,property_id:string,from :number ,to :number,thing_token:string):Promise<any>{
        if (from !== undefined && to !== undefined) {
            const readPropertyAPI = api_url+'/things/'+thing_id+'/properties/'+property_id+ '?from=' + from + '&to=' + to;
            return http.GETRequest(readPropertyAPI,thing_token)
        }else {
            return http.GETRequest(api_url+'/things/'+thing_id+'/properties/'+property_id,thing_token)
        }   
    }

    static async deleteThing(thing_id:string,thing_token:string):Promise<any>{
        return http.DELETERequest(api_url+'/things/'+thing_id,thing_token)
    }

    static async deleteProperty(thing_id:string,property_id:string,thing_token:string):Promise<any>{
        return http.DELETERequest(api_url+'/things/'+thing_id+'/properties/'+property_id,thing_token)
    }

    static async createThing(thing_json:{},jwt:boolean,thing_token:string):Promise<any>{
        if(jwt!== undefined){
            return http.POSTRequest(api_url+'/things/?jwt='+jwt,thing_token,thing_json)
        }else{
            return http.POSTRequest(api_url+'/things/',thing_token,thing_json)
        }
        
    }

    static async createProperty(thing_id:string,property_json:{},thing_token:string):Promise<any>{
            return http.POSTRequest(api_url+'/things/'+thing_id+'/properties',thing_token,property_json)
        
    }

    static async updateProperty(thing_id:string,property_id:string,values:number[],thing_token:string):Promise<any>{
        return http.POSTRequest(api_url+'/things/'+thing_id+'/properties/'+property_id+'/values/'+values.join()+'/file',thing_token,{})
    }
    
    

}