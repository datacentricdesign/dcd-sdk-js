import * as http from '../helpers/http'
import {Service} from "./Service";

export class StatService extends Service {

    /**
     * Get global stats
     * @param token
     * @returns {Promise<any>}
     */
    async getGlobalStats(token: string): Promise<any> {
        return http.GETRequest(this.apiUrl + '/stats', token)
    }

    /**
     * Get property Type stats
     * @param PropertyType
     * @param token
     * @param from (optionnal)
     * @param to (optionnal)
     * @returns {Promise<any>}
     */
    async getPropertyTypesStats(propertyTypes: string[], token: string, from: number = undefined, to: number = undefined): Promise<any> {
        if (from && to) {
            return http.GETRequest(this.apiUrl + '/stats/propertyTypes?types=' + propertyTypes.join() + '&from=' + from + '&to=' + to, token)
        } else {
            return http.GETRequest(this.apiUrl + '/stats/propertyTypes?types=' + propertyTypes.join(), token)
        }
    }
}
