import  * as http from '../helpers/http'

const user_url = 'https://dwd.tudelft.nl:443/userinfo'
const api_url = 'https://dwd.tudelft.nl:443/api'
const auth_url = 'https://dwd.tudelft.nl:443/oauth2/auth'

export class PersonService {

    static async readUser(person_token:string):Promise<any>{
        return http.GETRequest(user_url,person_token)
    }

    static async readUserId(person_id,person_token):Promise<any>{
        return http.GETRequest(api_url+'/persons/'+person_id,person_token)
    }

    static async logout(person_sub,person_token):Promise<any>{
        return http.DELETERequest(auth_url+'/sessions/login?subject='+person_sub,person_token)
    }

    static async revokeConsent(person_sub,person_token):Promise<any>{
        return http.DELETERequest(auth_url+'/sessions/consent?subject='+person_sub,person_token)
    }

}