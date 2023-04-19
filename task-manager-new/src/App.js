import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard/dashboard';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import ComposeContext from './context/Compose.context';
// import { rootContext } from './context/root.context';



const App = () => {
  fetch("http://localhost:3000/users")
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
