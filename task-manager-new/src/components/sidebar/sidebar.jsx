import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Profile } from '../profile/profile';
import { CreateTaskForm } from '../createTaskForm/createTaskForm';

export const Sidebar = () => {
  const email = localStorage.getItem('user')
    const [username, setUsername] = useState('')
  
    fetch(`http://dove.task-manager-backend.c66.me/users/search?email=${email}`)
    .then(response => response.json())
    .then(data => {
      setUsername(data.name)
    })
    .catch(error => console.error(error))

  return (
    <Grid item md={4} sx={{
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Profile name={username} />
        <CreateTaskForm />
    </Grid>
  )
}

