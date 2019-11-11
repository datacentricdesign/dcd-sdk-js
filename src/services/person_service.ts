import * as http from '../helpers/http'

const user_url = process.env.OAUTH2_PROFILE;
const api_url = process.env.API_URL;
const auth_url = process.env.OAUTH2_AUTH_URL;
const revoke_url = process.env.OAUTH2_REVOKE_URL;
const client_id = process.env.OAUTH2_CLIENT_ID;
const client_secret = process.env.OAUTH2_CLIENT_SECRET;

export class PersonService {

    /**
     * function read user credentials.
     * @param token
     * @returns {Promise<any>}
     */
    static async readUser(token: string): Promise<any> {
        return http.GETRequest(user_url, token)
    }

    /**
     * function read user id (subject).
     * @param person_id
     * @param token
     * @returns {Promise<any>}
     */
    static async readUserId(person_id, token): Promise<any> {
        return http.GETRequest(api_url + '/persons/' + person_id, token)
    }

    /**
     * Revoke login
     * @param person_sub
     * @param token
     * @returns {Promise<any>}
     */
    static async logout(person_sub, token): Promise<any> {
        console.log('log out API');
        const logOutURI = encodeURI(revoke_url);
        console.log(logOutURI);
        return http.POSTRequestEncoded(logOutURI, token, "token=" + token + "&client_id=" + client_id + "&client_secret=" + client_secret)
    }


}
