"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
const tasks_validator_1 = require("./tasks.validator");
// Fire the router function to create a new router
exports.tasksRouter = (0, express_1.Router)();
// Create a default route
exports.tasksRouter.get('/tasks', tasks_controller_1.taskController.getAll);
// Create a post route
exports.tasksRouter.post('/tasks', tasks_validator_1.createValidator, tasks_controller_1.taskController.create);
// Create a put route
exports.tasksRouter.put('/tasks', tasks_validator_1.updateValidator, tasks_controller_1.taskController.update);
