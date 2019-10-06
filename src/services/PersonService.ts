import * as http from '../helpers/http'
import {Service} from "./Service";

export class PersonService extends Service {
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly revokeUrl: string;

    constructor(settings) {
        super(settings);
        this.clientId = settings.client.id;
        this.clientSecret = settings.client.secret;
        this.revokeUrl = settings.url.revoke;
    }

    /**
     * function read user credentials.
     * @param token
     * @returns {Promise<any>}
     */
    async list(token: string): Promise<any> {
        return http.GETRequest(this.apiUrl, token)
    }

    /**
     * function read user id (subject).
     * @param person_id
     * @param token
     * @returns {Promise<any>}
     */
    async read(person_id, token): Promise<any> {
        return http.GETRequest(this.apiUrl + '/persons/' + person_id, token)
    }

    /**
     * Revoke login
     * @param person_sub
     * @param token
     * @returns {Promise<any>}
     */
    async logout(person_sub, token): Promise<any> {
        const logOutURI = encodeURI(this.revokeUrl);
        return http.POSTRequestEncoded(logOutURI, token,
            "token=" + token + "&client_id="
            + this.clientId + "&client_secret=" + this.clientSecret)
    }


}
