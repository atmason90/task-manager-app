import React from 'react'
import { Box } from '@mui/material';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import PropTypes from 'prop-types';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

export const Task = (props) => {
    // Destructure props
    const { 
        title = 'Test Title', 
        due_date = null,
        description = 'Lorem ipsum dolor sit amet', 
        priority = 'normal',
        status = 'completed',
        onStatusChange = (e) => console.log(e),
        onClick = (e) => console.log(e),    
        id,
    } = props;

    return (
        <Box
            display='flex'
            width='100%'
            justifyContent='flex-start'
            flexDirection='column'
            mb={4}
            p={2}
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: renderPriorityBorderColor(priority),
            }}
        >
            {/* task header */}
            <TaskHeader title={title} due_date={due_date} />
            {/* task description */}
            <TaskDescription description={description} priority={priority} />
            {/* task footer */}
            <TaskFooter 
                onClick={onClick} 
                onStatusChange={onStatusChange} 
                id={id}
                status={status}
            />

        </Box>
    )
}

Task.propTypes = {
    title: PropTypes.string,
    due_date: PropTypes.string,
    description: PropTypes.string,
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string,
};