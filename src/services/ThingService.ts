import * as http from '../helpers/http'
import {Service} from "./Service";

export class ThingService extends Service {

    /**
     * function read all things.
     * @param token
     * @returns {Promise<any>}
     */
    async list(token: string): Promise<any> {
        return http.GETRequest(this.apiUrl + '/things', token)
    }

    /**
     * function read a thing with his id.
     * @param thing_id
     * @param token
     * @returns {Promise<any>}
     */
    async read(thing_id: string, token: string): Promise<any> {
        return http.GETRequest(this.apiUrl + '/things/' + thing_id, token)
    }

    /**
     * function delete a thing with his id.
     * @param thing_id
     * @param token
     * @returns {Promise<any>}
     */
    async delete(thing_id: string, token: string): Promise<any> {
        return http.DELETERequest(this.apiUrl + '/things/' + thing_id, token)
    }

    /**
     * function create a thing with a thing in json.
     * you can set if you want a jwt in response
     * @param thing_json
     * @param jwt
     * @param token
     * @returns {Promise<any>}
     */
    async create(thing_json: {}, jwt: boolean, token: string): Promise<any> {
        if (jwt) {
            return http.POSTRequestWithTimeOut(this.apiUrl + '/things/?jwt=' + jwt, token, thing_json, 60000)
        } else {
            return http.POSTRequestWithTimeOut(this.apiUrl + '/things/', token, thing_json, 60000)
        }
    }


}
