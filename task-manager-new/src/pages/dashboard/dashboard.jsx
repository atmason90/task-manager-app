import React, { useState } from 'react';
import { Grid } from  '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Taskarea } from '../../components/taskarea/taskarea';
import { Sidebar } from '../../components/sidebar/sidebar';
// import { LoginForm } from '../../components/loginForm/loginForm'


export const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
  
    const handleLogin = () => {
      // TODO: handle login logic here
      fetch(`https://dove.task-manager-backend.c66.me/users/search?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error(error))
      console.log(`Logging in with username: ${username}`);
      setLoggedIn(true)
    };

    const handleSignup = () => {
        console.log(`Signing up with username: ${username}`)
    }

    return(
        <>
        {loggedIn ? (
        <Grid container minHeight="100vh" p={0} m={0}>
           <Taskarea />
           <Sidebar />
        </Grid>
        ) : (
            <div>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
              <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="contained" onClick={handleSignup}>
              Signup
            </Button>
          </div>
         )}
        </>
    )
};