import React from 'react';
import { 
    Box,
    Button,
    FormControlLabel,
    Switch,
} from '@mui/material';
import PropTypes from 'prop-types';


export const TaskFooter = (props) => {
  // Destructure props
  const { 
    id,
    status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e)
  } = props;   
  return (
   <Box
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    my={4}
   >
    <FormControlLabel 
        label='In Progress'
        control={
            <Switch 
                onChange={(e) => onStatusChange(e, id)}
                color='warning'
                defaultChecked={status === 'inProgress'}
            />
        }
    />
    <Button
        variant='contained'
        color='success'
        size='small'
        sx={{color: '#ffffff'}}
        onClick={(e) => onClick(e, id)}
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
        // onClick={(e) => onClick(e, id)}
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