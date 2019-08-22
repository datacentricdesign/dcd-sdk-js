import  * as http from '../helpers/http'

const user_url = 'https://dwd.tudelft.nl:443/userinfo'
const api_url = 'https://dwd.tudelft.nl:443/api'
const auth_url = 'https://dwd.tudelft.nl:443/oauth2/auth'

export class PersonService {

    /**
     * function read user credentials.
     * @param token 
     * @returns {Promise<any>}
     */
    static async readUser(token:string):Promise<any>{
        return http.GETRequest(user_url,token)
    }
    /**
     * function read user id (subject).
     * @param person_id 
     * @param token 
     * @returns {Promise<any>}
     */
    static async readUserId(person_id,token):Promise<any>{
        return http.GETRequest(api_url+'/persons/'+person_id,token)
    }
    /**
     * Revoke login
     * @param person_sub 
     * @param token
     * @returns {Promise<any>} 
     */
    static async logout(person_sub,token):Promise<any>{
        return http.DELETERequest(encodeURI(auth_url+'/sessions/login?subject='+person_sub),token)
    }
    /*
    static async revokeConsent(person_sub,token):Promise<any>{
        return http.DELETERequest(auth_url+'/sessions/consent?subject='+person_sub,token)
    }*/

}