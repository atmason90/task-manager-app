import  { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';


// Fire the router function to create a new router
export const tasksRouter: Router = Router();

// Create a default route
tasksRouter.get('/tasks', taskController.getAll);

// Create a post route
tasksRouter.post('/tasks', createValidator, taskController.create);

// Create a put route
tasksRouter.put('/tasks', updateValidator, taskController.update);