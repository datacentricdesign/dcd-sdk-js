import  * as http from '../helpers/http'

const user_url = 'https://dwd.tudelft.nl/userinfo'
const api_url = 'https://dwd.tudelft.nl/api'

export class PersonService {

    static async readUser(person_token:string):Promise<any>{
        return http.GETRequest(user_url,person_token)
    }

    static async readUserId(person_id,person_token):Promise<any>{
        return http.GETRequest(api_url+'/persons/'+person_id,person_token)
    }

}