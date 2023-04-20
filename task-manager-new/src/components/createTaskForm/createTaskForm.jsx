import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
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

    const formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate)

    // const userEmail = localStorage.getItem('user').replace(/"/g, '')
    // console.log(userEmail)

    function createTaskHandler() {
        if (!title || !date || !description) {
          return;
        };
        const userEmail = localStorage.getItem('user').replace(/"/g, '');
        fetch(`https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`)
          .then(response => response.json())
          .then(data => {
            const userId = data.id;
            fetch(`https://dove.task-manager-backend.c66.me/users/${userId}/tasks`, {
              method: 'POST',
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
              console.log('Task created:', data);
            })
            .catch(error => console.log('Error creating task:', error));
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
                Create A Task
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
                                value: 'to-do',
                                label: 'to-do',
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


