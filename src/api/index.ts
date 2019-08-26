import * as express from "express";
const router = express.Router();

import {PersonService} from '../services/person_service'
import {ThingService} from '../services/thing_service'
import {PropertyService} from '../services/property_service' 
import {StatService} from '../services/stat_service'
import {TaskService} from '../services/task_service'

router.delete('/logout',
    async (req, res, next) => {
        const subject = req.query.subject
        console.log('delete','logout'+'?subject=' + subject)
        const result = await PersonService.logout(subject,req['user'].accessToken)
        console.log(result)
        res.send(result)
});

router.get('/things',
      async (req, res, next) => {
          console.log('get','api/things')
          const result = await ThingService.list(req['user'].accessToken)
          res.send(result)
});
  
router.get('/things/:thingId',
       async (req, res, next) => {
          const thingId = req.params.thingId;
          console.log('get','api/things/'+thingId)
          const result = await ThingService.read(thingId,req['user'].accessToken)
          res.send(result)
});
  
router.get('/user',
       async (req, res, next) => {
          console.log('get','api/user')
          const result = await PersonService.readUser(req['user'].accessToken)
          res.send(result)
});
  
router.get('/persons/:userId',
       async (req, res, next) => {
          const userId = req.params.userId;
          console.log('get','api/user/'+userId)
          const result = await PersonService.readUserId(userId,req['user'].accessToken)
          res.send(result)
});
  
router.get('/things/:thingId/properties/:propertyId',
       async (req, res, next) => {
        const thingId = req.params.thingId
        const propertyId = req.params.propertyId
        const from = req.query.from
        const to = req.query.to 
        if(from && to ){
         console.log('get','api/things/'+thingId+'/properties/'+propertyId+'?from=' + from + '&to=' + to);
        }else{
         console.log('get','api/things/'+thingId+'/properties/'+propertyId);
        }
        const result = await PropertyService.read(thingId,propertyId,req['user'].accessToken,from,to)
        res.send(result)
});
  
router.delete('/things/:thingId',
       async (req, res, next) => {
          const thingId = req.params.thingId
          console.log('delete','api/things/'+thingId)
          const result = await ThingService.delete(thingId,req['user'].accessToken)
          res.send(result)
});
  
router.delete('/things/:thingId/properties/:propertyId',
       async (req, res, next) => {
          const thingId = req.params.thingId
          const propertyId = req.params.propertyId
          console.log('delete','api/things/'+thingId+'/properties/'+propertyId)
          const result = await PropertyService.delete(thingId,propertyId,req['user'].accessToken)
          res.send(result)
});
  
router.post('/things',
        async (req, res, next) => {
            const jwt = req.query.jwt
            const body = req.body
            console.log('post','api/things/'+'?jwt=' + jwt,body)
            const result = await ThingService.create(body,jwt,req['user'].accessToken)
            res.send(result)
});
  
router.post('/things/:thingId/properties',
          async (req, res, next) => {
              const thingId = req.params.thingId
              const body = req.body
              console.log('post','api/things/'+thingId+'/properties',body)
              const result = await PropertyService.create(thingId,body,req['user'].accessToken)
              res.send(result)
});

router.get('/stats',
 async (req, res, next) => {
  console.log('get','api/stats');
  const result = await StatService.getGlobalStats(req['user'].accessToken)
  res.send(result)
});  

router.get('/stats/propertyTypes',
 async (req, res, next) => {
  if (!req.query.types) {
   res.status(400).send({
     message: 'types is undefined'
  });
  }else{
  let propertyTypes = req.query.types.split(',')
  const from = req.query.from
  const to = req.query.to 
  if(from && to ){
   console.log('get','api/stats/propertyTypes?from=' + from + '&to=' + to,propertyTypes);
  }else{
   console.log('get','api/stats/propertyType',propertyTypes);
  }
  const result = await StatService.getPropertyTypesStats(propertyTypes,req['user'].accessToken,from,to)
  res.send(result)
}
});

router.get('/tasks',
 async (req, res, next) => {
   console.log('get','api/tasks')
   const result = await TaskService.list(req['user'].accessToken)
   res.send(result)
});

router.post('/tasks',
 async (req, res, next) => {
   const body = req.body
   console.log('post','api/tasks',body)
   const result = await TaskService.create(body,req['user'].accessToken)
   res.send(result)
});

router.get('/tasks/:taskId',
 async (req, res, next) => {
   const taskId = req.params.taskId
   console.log('get','api/tasks/'+taskId)
   const result = await TaskService.read(taskId,req['user'].accessToken)
   res.send(result)
});

router.delete('/tasks/:taskId',
 async (req, res, next) => {
   const taskId = req.params.taskId
   console.log('delete','api/tasks/'+taskId)
   const result = await TaskService.delete(taskId,req['user'].accessToken)
   res.send(result)
});

router.get('/tasks/:taskId/resources',
 async (req, res, next) => {
   const taskId = req.params.taskId
   const actor = req.query.actor
   console.log('get','api/tasks/'+taskId+'/resources'+'?actor='+actor)
   const result = await TaskService.readResources(taskId,actor,req['user'].accessToken)
   res.send(result)
});

router.post('/tasks/:taskId/resources/:resourceId/milestones',
 async (req, res, next) => {
   const body = req.body
   const taskId = req.params.taskId
   const resourceId = req.params.resourceId
   console.log('post','api/tasks/'+taskId+'/resources/'+resourceId+'/milestones',body)
   const result = await TaskService.addMilestone(taskId,resourceId,body,req['user'].accessToken)
   res.send(result)
});



export const RouterAPI = router