import React from 'react';
import { 
    Box,
    Button,
    FormControlLabel,
    Switch,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';


export const TaskFooter = (props) => {
  // Destructure props
  const { 
    id,
    status,
    onStatusChange = (e) => console.log(e),
    onDelete = (e) => console.log(e)
  } = props;  
  
  const updateTaskStatus = (newStatus) => {
    const userEmail = localStorage.getItem("user").replace(/"/g, "");
    fetch(
      `https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`
    )
      .then((response) => response.json())
      .then((data) => {
        const userId = data.id;
        fetch(`https://dove.task-manager-backend.c66.me/users/${userId}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: newStatus })
        })
    })
    .then(response => response.json())
    .then(data => {
        onStatusChange(data.status)
    })
    .catch(error => console.error(error))
  }

  const deleteTask = () => {
    const userEmail = localStorage.getItem("user").replace(/"/g, "");
    fetch(
      `https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`
    )
      .then((response) => response.json())
      .then((data) => {
        const userId = data.id;
        return fetch(`https://dove.task-manager-backend.c66.me/users/${userId}/tasks/${id}`, {
          method: 'DELETE',
        });
      })
      .then(() => {
        // If the task was deleted successfully, call a callback function to notify the parent component
        // You can define the callback function as a prop and pass it down to TaskFooter
        onDelete(id);
      })
      .catch(error => console.error(error));
  };
  
  return (
   <Box
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    my={4}
   >
   {status === 'completed' ? (
        <Typography sx={{ fontWeight: 'bold', color: 'success.main' }}>
          COMPLETE
        </Typography>
      ) : (
        <FormControlLabel
          label='In Progress'
          control={
            <Switch
              onChange={(e) => {
                const newStatus = e.target.checked ? 'inProgress' : 'todo';
                updateTaskStatus(newStatus);
              }}
              color='warning'
              defaultChecked={status === 'inProgress'}
            />
          }
        />
      )}
    <Button
        variant='contained'
        color='success'
        size='small'
        sx={{color: '#ffffff'}}
        onClick={(e) => {
            updateTaskStatus('completed')
        }}
        disabled={status === 'completed'}
    >
        Complete
    </Button>
    <Button
        variant='contained'
        color='warning'
        size='small'
        sx={{color: '#ffffff'}}
        // onClick={(e) => onClick(e, id)}
    >
        Edit
    </Button>
    <Button
        variant='contained'
        color='error'
        size='small'
        sx={{color: '#ffffff'}}
        onClick={deleteTask}
    >
        Delete
    </Button>
   </Box>
  )
}

TaskFooter.propTypes = {
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
};