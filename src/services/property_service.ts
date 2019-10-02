import * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class PropertyService {

    /**
     * function read a property with his id.
     * read also the value from a date to another (timestamp)
     * @param thing_id
     * @param property_id
     * @param token
     * @param from (optionnal)
     * @param to (optionnal)
     * @returns {Promise<any>}
     */
    static async read(thing_id: string, property_id: string, token: string, from: number = undefined, to: number = undefined): Promise<any> {
        if (from && to) {
            const readPropertyAPI = api_url + '/things/' + thing_id + '/properties/' + property_id + '?from=' + from + '&to=' + to;
            return http.GETRequest(readPropertyAPI, token)
        } else {
            return http.GETRequest(api_url + '/things/' + thing_id + '/properties/' + property_id, token)
        }
    }


    /**
     * function delete a property with his id.
     * @param thing_id
     * @param property_id
     * @param token
     * @returns {Promise<any>}
     */
    static async delete(thing_id: string, property_id: string, token: string): Promise<any> {
        return http.DELETERequest(api_url + '/things/' + thing_id + '/properties/' + property_id, token)
    }


    /**
     * function create a property with a property in json.
     * @param thing_id
     * @param property_json
     * @param token
     * @returns {Promise<any>}
     */
    static async create(thing_id: string, property_json: {}, token: string): Promise<any> {
        return http.POSTRequest(api_url + '/things/' + thing_id + '/properties', token, property_json)

    }


    /**
     * function update a property with an array of values.
     * @param thing_id
     * @param property_id
     * @param values
     * @param token
     * @returns {Promise<any>}
     */
    static async update(thing_id: string, property_id: string, property_json: {}, token: string): Promise<any> {
        return http.PUTRequest(api_url + '/things/' + thing_id + '/properties/' + property_id, token, property_json)
    }

    /**
     * function update a property with an array of values and a file.
     * @param thing_id
     * @param property_id
     * @param values
     * @param token
     * @returns {Promise<any>}
     */
    static async updatefile(thing_id: string, property_id: string, values: number[], token: string): Promise<any> {
        return http.POSTRequest(api_url + '/things/' + thing_id + '/properties/' + property_id + '/values/' + values.join() + '/file', token, {})
    }


}
