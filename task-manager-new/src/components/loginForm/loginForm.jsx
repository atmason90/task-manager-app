import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginForm() {
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

  return (
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
    </div>
  );
}

export { LoginForm };