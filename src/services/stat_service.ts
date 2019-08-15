import  * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class StatService {

    /**
     * Get global stats
     * @param token 
     * @returns {Promise<any>}
     */
    static async getGlobalStats(token:string):Promise<any>{
        return http.GETRequest(api_url+'/stats',token)
    }

    /**
     * Get property Type stats
     * @param PropertyType 
     * @param token 
     * @param from (optionnal)
     * @param to (optionnal)
     * @returns {Promise<any>}
     */
    static async getPropertyTypeStats(propertyType:string,token:string,from:number=undefined,to:number=undefined):Promise<any>{
        if(from && to){
        return http.GETRequest(api_url+'/stats/propertyTypes/'+propertyType+'?from=' + from + '&to=' + to,token)
        }else{
        return http.GETRequest(api_url+'/stats/propertyTypes/'+propertyType,token) 
        }
    }

    /**
     * Get property Type stats
     * @param PropertyType 
     * @param token 
     * @param from (optionnal)
     * @param to (optionnal)
     * @returns {Promise<any>}
     */
    static async getPropertyTypesStats(propertyTypes:string[],token:string,from:number=undefined,to:number=undefined):Promise<any>{
        let body = {
            propertyTypes : propertyTypes
        }
        if(from && to){
        return http.GETRequestWithBody(api_url+'/stats/propertyTypes?from=' + from + '&to=' + to,token,body)
        }else{
            return http.GETRequestWithBody(api_url+'/stats/propertyTypes',token,body) 
        }
    }
}