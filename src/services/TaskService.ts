import * as http from '../helpers/http'
import {Service} from "./Service";

const api_url = 'https://dwd.tudelft.nl:443/api'

export class TaskService extends Service {

    /**
     * function read all tasks.
     * @param token
     * @returns {Promise<any>}
     */
    async list(token: string): Promise<any> {
        return http.GETRequest(this.apiUrl + '/tasks', token)
    }

    /**
     * function read a task with his id.
     * @param task_id
     * @param token
     * @returns {Promise<any>}
     */
    async read(task_id: string, token: string): Promise<any> {
        return http.GETRequest(this.apiUrl + '/tasks/' + task_id, token)
    }

    /**
     * function delete a task with his id.
     * @param task_id
     * @param token
     * @returns {Promise<any>}
     */
    async delete(task_id: string, token: string): Promise<any> {
        return http.DELETERequest(this.apiUrl + '/tasks/' + task_id, token)
    }

    /**
     * function create a task with a task in json.
     * @param task_json
     * @param thing_token
     * @returns {Promise<any>}
     */
    async create(task_json: {}, token: string): Promise<any> {
        return http.POSTRequestWithTimeOut(this.apiUrl + '/tasks', token, task_json, 60000)
    }

    /**
     * function read resources of a task
     * @param task_id
     * @param token
     */
    async readResources(task_id: string, actor: boolean, token: string) {
        if (actor) {
            return http.GETRequest(this.apiUrl + '/tasks/' + task_id + '/resources?actor=' + actor, token)
        } else {
            return http.GETRequest(this.apiUrl + '/tasks/' + task_id + '/resources', token)
        }
    }

    /**
     * function add milestone to a resource of a task
     * @param task_id
     * @param resource_id
     * @param milestone
     * @param token
     */
    async addMilestone(task_id: string, resource_id: string, milestone: {}, token: string) {
        return http.POSTRequest(this.apiUrl + '/tasks/' + task_id + '/resources/' + resource_id + '/milestones', token, milestone)
    }

}
