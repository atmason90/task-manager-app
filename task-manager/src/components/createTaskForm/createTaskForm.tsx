import React, { FC, ReactElement, useState, useEffect, useContext } from 'react';
import { Box, Typography, Stack, LinearProgress, Button, Alert, AlertTitle } from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/status';
import { Priority } from './enums/priority';
import { useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskarea/interfaces/ICreateTasks';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
    // Declare states
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.normal);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const tasksUpdatedContext = useContext(TaskStatusChangedContext)

    // Create task mutation
    const createTaskMutation = useMutation((data: ICreateTask) =>
        sendApiRequest(
            'http://localhost:3001/tasks',
            'POST',
            data
        )
    );

    function createTaskHandler() {
        if(!title || !date || !description) {
            return;
        };
        const task: ICreateTask = {
            title,
            description,
            date: date.toString(),
            status,
            priority,
        };
        createTaskMutation.mutate(task);
    };

    // Manage side effects inside the app
    useEffect(() => {
        if(createTaskMutation.isSuccess) {
            setShowSuccess(true);
            tasksUpdatedContext.toggle();
        }
        const successTimeout = setTimeout(() => {
            setShowSuccess(false);
        }, 7000);
        return () => {
            clearTimeout(successTimeout);
        }
    }, 
    [
        createTaskMutation.isSuccess
    ]);

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            width='100%'
            px={4}
            my={6}
        >
            {showSuccess && (
                  <Alert
                  severity='success'
                  sx={{width: '100%', marginBottom: '16px'}}
              >
                  <AlertTitle>Success</AlertTitle>
                  The task has been created successfully
              </Alert>
            )}
            <Typography mb={2} component='h2' variant='h6'>
                Create A Task
            </Typography>
            <Stack sx={{ width: '100%'}} spacing={2}>
                {/* Title of task */}
                <TaskTitleField 
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                {/* Task Description */}
                <TaskDescriptionField 
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                {/* Date */}
                <TaskDateField 
                    value={date}
                    onChange={(date) => setDate(date)}
                    disabled={createTaskMutation.isLoading}
                />
                <Stack direction='row' spacing={2}>
                    {/* Task Status & Priority */}
                    <TaskSelectField 
                        label='Status' 
                        name='status'
                        value={status}
                        disabled={createTaskMutation.isLoading}
                        onChange={(e) => setStatus(e.target.value as string)}
                        items={[
                            {
                                value: Status.todo,
                                label: Status.todo,
                            },
                            {
                                value: Status.inProgress,
                                label: Status.inProgress,
                            },
                    ]} />
                    <TaskSelectField 
                        label='Priority' 
                        name='priority' 
                        value={priority}
                        disabled={createTaskMutation.isLoading}
                        onChange={(e) => setPriority(e.target.value as string)}
                        items={[
                            {
                                value: Priority.low,
                                label: Priority.low,
                            },
                            {
                                value: Priority.normal,
                                label: Priority.normal,
                            },
                            {
                                value: Priority.high,
                                label: Priority.high,
                            },
                        ]} 
                    />
                </Stack>
                {createTaskMutation.isLoading && <LinearProgress />}
                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        !status ||
                        !priority
                    }
                    onClick={createTaskHandler}
                    variant='contained'
                    size='large'
                    fullWidth
                >
                    Create Task
                </Button>
            </Stack>
        </Box>
    )
}


