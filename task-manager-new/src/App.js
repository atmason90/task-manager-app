import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard/dashboard';

const App = () => {
  fetch("https://dove.task-manager-backend.c66.me/users")
    .then(res => console.log(res.json()))
    .then(data => console.log(data))
  return (
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Dashboard />
        </ThemeProvider>
  )
}

export default App
