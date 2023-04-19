import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginForm() {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    // TODO: handle login logic here
    console.log(`Logging in with username: ${username}`);
  };

  return (
    <div>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}

export default LoginForm;

