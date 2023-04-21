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
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = () => {
      // TODO: handle login logic here
      fetch(`https://dove.task-manager-backend.c66.me/users/search?email=${email}`)
      .then(response => {
        if (response.status == 404) {
            setErrorMessage("User does not exist. Please try again!");
            throw new Error("User does not exist");
        } else {
            return response.json()
        }
        })
      .then(data => {
        console.log(data)
        console.log(`Logging in with username: ${username}`);
        setLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(data.email))
      })
      .catch(error => console.error(error))
      
    };

    const handleSignup = () => {
        fetch(`https://dove.task-manager-backend.c66.me/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Signup will use email for both username and email
                name: email,
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(`Signing up with username: ${username}`)
            setLoggedIn(true)
            localStorage.setItem('user', JSON.stringify(data.email))
        })
        .catch(error => console.log(error))
    }

    return(
        <>
        {loggedIn ? (
        <Grid container minHeight="100vh" p={0} m={0}>
           <Taskarea />
           <Sidebar />
        </Grid>
        ) : (
            <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}
            >
            {(errorMessage != "") ? <h3 style={{color: 'red'}}>{errorMessage}</h3> : null}
            <h1>SESL Task Manager</h1>
            <TextField
            label="Username"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value) && setErrorMessage("")}
            style={{margin: '7px'}}
            />
            <div>
                <Button variant="contained" onClick={handleLogin} style={{margin: '7px'}}>
                Login
                </Button>
                <Button variant="contained" onClick={handleSignup} style={{margin: '7px'}}>
                Signup
                </Button>
            </div>
          </div>
         )}
        </>
    )
};