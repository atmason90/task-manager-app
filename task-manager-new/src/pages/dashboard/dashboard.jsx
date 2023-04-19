import React from 'react';
import { Grid } from  '@mui/material';
import { Taskarea } from '../../components/taskarea/taskarea';
import { Sidebar } from '../../components/sidebar/sidebar';
import {LoginForm} from '../../components/loginForm/loginForm'


export const Dashboard = () => {
    return(
        <>
        {loggedin ? (
            <Grid container minHeight="100vh" p={0} m={0}>
           <Taskarea />
           <Sidebar />
        </Grid>
        ) : (<LoginForm/>)}
        </>
    )
};