import React, { useState } from 'react';
import { Box, Typography, Stack, LinearProgress, Button, Alert, AlertTitle } from '@mui/material';
import { TaskDateField } from './_taskDateField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskSelectField } from './_taskSelectField';
import { TaskTitleField } from './_taskTitleField';

export const CreateTaskForm = () => {
    // Declare states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState('to-do');
    const [priority, setPriority] = useState('normal');
    const [showSuccess, setShowSuccess] = useState(false);


    // Create task mutation

    function createTaskHandler() {
        if(!title || !date || !description) {
            return;
        };
        const task = {
            title,
            description,
            date: date.toString(),
            status,
            priority,
        };
        // createTaskMutation.mutate(task);
    };

    // Manage side effects inside the app
    // useEffect(() => {
    //     if(createTaskMutation.isSuccess) {
    //         setShowSuccess(true);
    //         tasksUpdatedContext.toggle();
    //     }
    //     const successTimeout = setTimeout(() => {
    //         setShowSuccess(false);
    //     }, 7000);
    //     return () => {
    //         clearTimeout(successTimeout);
    //     }
    // }, 
    // [
    //     createTaskMutation.isSuccess
    // ]);

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
                    // disabled={createTaskMutation.isLoading}
                />
                {/* Task Description */}
                <TaskDescriptionField 
                    onChange={(e) => setDescription(e.target.value)}
                    // disabled={createTaskMutation.isLoading}
                />
                {/* Date */}
                <TaskDateField 
                    value={date}
                    onChange={(date) => setDate(date)}
                    // disabled={createTaskMutation.isLoading}
                />
                <Stack direction='row' spacing={2}>
                    {/* Task Status & Priority */}
                    <TaskSelectField 
                        label='Status' 
                        name='status'
                        value={status}
                        // disabled={createTaskMutation.isLoading}
                        onChange={(e) => setStatus(e.target.value)}
                        // items={[
                        //     {
                        //         value: Status.todo,
                        //         label: Status.todo,
                        //     },
                        //     {
                        //         value: Status.inProgress,
                        //         label: Status.inProgress,
                        //     },
                    // ]} 
                    />
                    <TaskSelectField 
                        label='Priority' 
                        name='priority' 
                        value={priority}
                        // disabled={createTaskMutation.isLoading}
                        onChange={(e) => setPriority(e.target.value)}
                        // items={[
                        //     {
                        //         value: Priority.low,
                        //         label: Priority.low,
                        //     },
                        //     {
                        //         value: Priority.normal,
                        //         label: Priority.normal,
                        //     },
                        //     {
                        //         value: Priority.high,
                        //         label: Priority.high,
                        //     },
                        // ]} 
                    />
                </Stack>
                {/* {createTaskMutation.isLoading && <LinearProgress />} */}
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


