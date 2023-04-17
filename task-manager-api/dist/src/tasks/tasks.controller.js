"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const tasks_entity_1 = require("./tasks.entity");
const index_1 = require("../../index");
const class_transformer_1 = require("class-transformer");
const express_validator_1 = require("express-validator");
class TasksController {
    // Method for the get route
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Declare a variable to hold all tasks
            let allTasks;
            // Fetch all tasks using the repository
            try {
                allTasks = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task)
                    .find({
                    order: {
                        date: 'ASC',
                    },
                });
                // Convert the tasks instance to an array of objects
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks);
                return res.json(allTasks).status(200);
            }
            catch (_errors) {
                return res.json({ error: 'Internal server error' }).status(500);
            }
        });
    }
    // Method for the post route
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array() });
            }
            // Create a new instance of a task
            const newTask = new tasks_entity_1.Task();
            // Add all the required properties of the task object
            newTask.title = req.body.title;
            newTask.date = req.body.date;
            newTask.description = req.body.description;
            newTask.priority = req.body.priority;
            newTask.status = req.body.status;
            // save the newly created task to the database
            let createdTask;
            try {
                createdTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).save(newTask);
                // convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res.json({ error: 'Internal server error' }).status(500);
            }
        });
    }
    // Method for put route
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array() });
            }
            // Try to find the task and see if it exists
            let task;
            try {
                task = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).findOne({
                    where: { id: req.body.id },
                });
            }
            catch (errors) {
                return res.json({ error: 'Internal server error' }).status(500);
            }
            // Return 400 error if task is null
            if (!task) {
                return res.status(404).json({
                    error: 'The task with given ID does not exist'
                });
            }
            // Declare a variable for updated task
            let updatedTask;
            // Update the task
            try {
                updatedTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).update(req.body.id, (0, class_transformer_1.plainToInstance)(tasks_entity_1.Task, {
                    status: req.body.status
                }));
                // Convert the updated task instance to an object
                updatedTask = (0, class_transformer_1.instanceToPlain)(updatedTask);
                return res.json(updatedTask).status(200);
            }
            catch (errors) {
                return res.json({ error: 'Internal server error' }).status(500);
            }
        });
    }
}
exports.taskController = new TasksController();
