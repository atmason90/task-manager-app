import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { TaskDateField } from '../createTaskForm/_taskDateField';
import { TaskDescriptionField } from '../createTaskForm/_taskDescriptionField';
import { TaskSelectField } from '../createTaskForm/_taskSelectField';
import { TaskTitleField } from '../createTaskForm/_taskTitleField';

export const EditTaskForm = ({ setIsEditing, task }) => {
    // Declare states
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [date, setDate] = useState(new Date(task?.due_date) || new Date());
    const [status, setStatus] = useState(task?.status || 'todo');
    const [priority, setPriority] = useState(task?.priority || 'normal');

    const formattedDate = date.toISOString().split('T')[0];

    // const userEmail = localStorage.getItem('user').replace(/"/g, '')
    // console.log(userEmail)

    function editTaskHandler() {
        if (!title || !date || !description) {
          return;
        };
        const userEmail = localStorage.getItem('user').replace(/"/g, '');
        fetch(`https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`)
          .then(response => response.json())
          .then(data => {
            const userId = data.id;
            fetch(`https://dove.task-manager-backend.c66.me/users/${userId}/tasks/${task.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: title,
                description: description,
                priority: priority,
                status: status,
                due_date: formattedDate
              })
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log(data)
            })
            .catch(error => console.log('Error editing task:', error));
          })
          .catch(error => console.log('Error fetching user data:', error));
      };
      

  

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            width='100%'
            px={4}
            my={6}
        >
            <Typography mb={2} component='h2' variant='h6'>
                Edit Task
            </Typography>
            <Stack sx={{ width: '100%'}} spacing={2}>
                {/* Title of task */}
                <TaskTitleField 
                    onChange={(e) => setTitle(e.target.value)}
                />
                {/* Task Description */}
                <TaskDescriptionField 
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/* Date */}
                <TaskDateField 
                    value={date}
                    onChange={(date) => setDate(date)}
                />
                <Stack direction='row' spacing={2}>
                    {/* Task Status & Priority */}
                    <TaskSelectField 
                        label='Status' 
                        name='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        items={[
                            {
                                value: 'todo',
                                label: 'todo',
                            },
                            {
                                value: 'inProgress',
                                label: 'inProgress',
                            },
                    ]} 
                    />
                    <TaskSelectField 
                        label='Priority' 
                        name='priority' 
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        items={[
                            {
                                value: 'low',
                                label: 'low',
                            },
                            {
                                value: 'normal',
                                label: 'normal',
                            },
                            {
                                value: 'high',
                                label: 'high',
                            },
                        ]} 
                    />
                </Stack>
                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        !status ||
                        !priority
                    }
                    onClick={editTaskHandler}
                    variant='contained'
                    size='large'
                    fullWidth
                >
                    Save
                </Button>
            </Stack>
        </Box>
    )
}


