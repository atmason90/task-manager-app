import { Task } from "./tasks.entity";
import { User } from '../users/user.entity'
import { AppDataSource } from "../../index";
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

interface AuthenticatedRequest extends Request {
    user: User;
}

class TasksController {
    // Method for the get route
    public async getAll(req: AuthenticatedRequest, res: Response): Promise<Response> {
        // retrieve currently logged in user
        const currentUser = req.user;
        // Declare a variable to hold all tasks
        let allTasks: Task[];
        
        // Fetch all tasks using the repository
        try {
            allTasks = await AppDataSource.getRepository(
                Task,
            )
            .find({
                where: {
                    user: currentUser
                },
                order: {
                    date: 'ASC',
                },
            });
            // Convert the tasks instance to an array of objects
            allTasks = instanceToPlain(allTasks) as Task[];
            return res.json(allTasks).status(200);
        } catch (_errors){
            return res.json({error: 'Internal server error'}).status(500);
        }
    }

    // Method for the post route
    public async create(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        // get the user from the request
        const user: User = req.user;

        // Create a new instance of a task
        const newTask = new Task();

        // Add all the required properties of the task object
        newTask.title = req.body.title;
        newTask.date = req.body.date;
        newTask.description = req.body.description;
        newTask.priority = req.body.priority;
        newTask.status = req.body.status;
        newTask.user = user;

        // save the newly created task to the database
        let createdTask: Task;
        try {
            createdTask = await AppDataSource.getRepository(
                Task,
            ).save(newTask);
            // convert the task instance to an object
            createdTask = instanceToPlain(createdTask) as Task;
            return res.json(createdTask).status(201);
        } catch (errors) {
            return res.json({error: 'Internal server error'}).status(500);
        }
    }

    // Method for put route
    public async update(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        // get the user from the request
        const user: User = req.user;

        // Try to find the task and see if it exists
        let task: Task | null;
        try {
            task = await AppDataSource.getRepository(Task).findOne({
                where: { id: req.body.id, user: user },
            })
        } catch (errors) {
            return res.json({error: 'Internal server error'}).status(500);
        }

        // Return 400 error if task is null
        if (!task) {
            return res.status(404).json({
                error: 'The task with given ID does not exist'
            })
        }

        // Declare a variable for updated task
        let updatedTask: UpdateResult;

        // Update the task
        try {
            updatedTask = await AppDataSource.getRepository(
                Task
            ).update(
                req.body.id, 
                plainToInstance(Task, {
                    status: req.body.status
                })
            );
             // Convert the updated task instance to an object
            updatedTask = instanceToPlain(updatedTask) as UpdateResult;
            return res.json(updatedTask).status(200);
        } catch (errors) {
            return res.json({error: 'Internal server error'}).status(500);
        }
    }
}

export const taskController = new TasksController();