"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const tasks_entity_1 = require("./src/tasks/tasks.entity");
const tasks_router_1 = require("./src/tasks/tasks.router");
// Instantiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
// Parse the request body
app.use(body_parser_1.default.json());
// Use cors install types
app.use((0, cors_1.default)());
// Create Database Connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [tasks_entity_1.Task],
    synchronize: true,
});
// Define server port
const PORT = process.env.PORT;
// Initialize TypeORM
exports.AppDataSource.initialize()
    .then(() => {
    app.listen(PORT);
    console.log('Data Source has been Initialized');
})
    .catch((err) => {
    console.log('Error during Data Source Initialization', err);
});
app.use('/', tasks_router_1.tasksRouter);
