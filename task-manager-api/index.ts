import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse the request body
app.use(bodyParser.json());

// Use cors install types
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true,
});

// Define server port
const PORT = process.env.PORT;

// Initialize TypeORM
AppDataSource.initialize()
    .then(() => {
        app.listen(PORT);
        console.log('Data Source has been Initialized');
    })
    .catch((err) => {
        console.log('Error during Data Source Initialization', err);
    });

app.use('/', tasksRouter);