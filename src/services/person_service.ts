import  * as http from '../helpers/http'

const user_url = 'https://dwd.tudelft.nl:443/userinfo'
const api_url = 'https://dwd.tudelft.nl:443/api'
const auth_url = 'https://dwd.tudelft.nl:443/oauth2/auth'

export class PersonService {

    /**
     * function read user credentials.
     * @param person_token 
     * @returns {Promise<any>}
     */
    static async readUser(person_token:string):Promise<any>{
        return http.GETRequest(user_url,person_token)
    }
    /**
     * function read user id (subject).
     * @param person_id 
     * @param person_token 
     * @returns {Promise<any>}
     */
    static async readUserId(person_id,person_token):Promise<any>{
        return http.GETRequest(api_url+'/persons/'+person_id,person_token)
    }
    /**
     * Revoke login
     * @param person_sub 
     * @param person_token
     * @returns {Promise<any>} 
     */
    static async logout(person_sub,person_token):Promise<any>{
        return http.DELETERequest(encodeURI(auth_url+'/sessions/login?subject='+person_sub),person_token)
    }
    /*
    static async revokeConsent(person_sub,person_token):Promise<any>{
        return http.DELETERequest(auth_url+'/sessions/consent?subject='+person_sub,person_token)
    }*/

}