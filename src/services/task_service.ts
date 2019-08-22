import  * as http from '../helpers/http'

const api_url = 'https://dwd.tudelft.nl:443/api'

export class TaskService {

    /**
     * function read all tasks.
     * @param token
     * @returns {Promise<any>} 
     */
    static async list(token:string):Promise<any>{
    return http.GETRequest(api_url+'/tasks',token)
    }

    /**
     * function read a task with his id.
     * @param task_id 
     * @param token
     * @returns {Promise<any>} 
     */
    static async read(task_id:string,token:string):Promise<any>{
    return http.GETRequest(api_url+'/tasks/'+task_id,token)
    }

    /**
     * function delete a task with his id.
     * @param task_id 
     * @param token 
     * @returns {Promise<any>}
     */
    static async delete(task_id:string,token:string):Promise<any>{
        return http.DELETERequest(api_url+'/tasks/'+task_id,token)
    }

    /**
     * function create a task with a task in json.
     * @param task_json 
     * @param thing_token 
     * @returns {Promise<any>}
     */
    static async create(task_json:{},token:string):Promise<any>{
        return http.POSTRequestWithTimeOut(api_url+'/tasks',token,task_json,60000)
    }

    /**
     * function read ressource of a task
     * @param task_id 
     * @param token 
     */
    static async readResources(task_id:string,actor:boolean,token:string){
        if(actor){
            return http.GETRequest(api_url+'/tasks/'+task_id+'/resources?actor='+actor,token)
        }else{
            return http.GETRequest(api_url+'/tasks/'+task_id+'/resources',token)
        }
    }

    /**
     * function add milestone in a ressource of a task
     * @param task_id 
     * @param resource_id 
     * @param milestone 
     * @param token 
     */
    static async addMilestone(task_id:string,resource_id:string,milestone:{},token:string){
        return http.POSTRequest(api_url+'/tasks/'+task_id+'/resources/'+resource_id+'/milestones',token,milestone)
    }

}