import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { Profile } from '../profile/profile';
import { CreateTaskForm } from '../createTaskForm/createTaskForm';

export const Sidebar = ({createTaskHandler, setTaskData }) => {
  const email = localStorage.getItem('user').replace(/"/g, '');
    const [username, setUsername] = useState('')
  
    fetch(`https://dove.task-manager-backend.c66.me/users/search?email=${email}`)
    .then(response => response.json())
    .then(data => {
      setUsername(data.name)
    })
    .catch(error => console.error(error))

    const handleLogout = () => {
      localStorage.removeItem('user')
      document.location.reload()
    }

  return (
    <Grid className='side-bar' item md={4} sx={{
        height: '100vh',
        position: 'relative',
        right: 0,
        top: 0,
        width: '100%',
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Button sx={{ marginBottom: '20px'}} onClick={handleLogout}>Logout</Button>
        <Profile name={username} />
        <CreateTaskForm createTaskHandler={createTaskHandler}/>
    </Grid>
  )
}

