import {API} from "./API";

export class TaskAPI extends API{

    protected init() {
        super.init();

        this.router.get('/tasks',
            async (req, res, next) => {
                console.log('get', 'api/tasks');
                const result = await this.model.getTasks().list(req['user'].accessToken);
                res.send(result)
            });

        this.router.post('/tasks',
            async (req, res, next) => {
                const body = req.body;
                console.log('post', 'api/tasks', body);
                const result = await this.model.getTasks().create(body, req['user'].accessToken);
                res.send(result)
            });

        this.router.get('/tasks/:taskId',
            async (req, res, next) => {
                const taskId = req.params.taskId;
                console.log('get', 'api/tasks/' + taskId);
                const result = await this.model.getTasks().read(taskId, req['user'].accessToken);
                res.send(result)
            });

        this.router.delete('/tasks/:taskId',
            async (req, res, next) => {
                const taskId = req.params.taskId;
                console.log('delete', 'api/tasks/' + taskId);
                const result = await this.model.getTasks().delete(taskId, req['user'].accessToken);
                res.send(result)
            });

        this.router.get('/tasks/:taskId/resources',
            async (req, res, next) => {
                const taskId = req.params.taskId;
                const actor = req.query.actor;
                console.log('get', 'api/tasks/' + taskId + '/resources' + '?actor=' + actor);
                const result = await this.model.getTasks().readResources(taskId, actor, req['user'].accessToken);
                res.send(result)
            });

        this.router.post('/tasks/:taskId/resources/:resourceId/milestones',
            async (req, res, next) => {
                const body = req.body;
                const taskId = req.params.taskId;
                const resourceId = req.params.resourceId;
                console.log('post', 'api/tasks/' + taskId + '/resources/' + resourceId + '/milestones', body);
                const result = await this.model.getTasks().addMilestone(taskId, resourceId, body, req['user'].accessToken);
                res.send(result)
            });
    }

}
