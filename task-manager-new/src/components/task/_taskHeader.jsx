import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

export const TaskHeader = (props) => {
  // Destructure props
  const { title='Default Title', due_date=null} = props
  const formattedDueDate = due_date ? format(new Date(due_date), 'PPP') : new Date(due_date).toLocaleDateString()
  return (
    <Box
        display='flex'
        width='100%'
        justifyContent='space-between'
        mb={3}
    >
        <Box>
            <Typography variant='h6'>
                {title}
            </Typography>
        </Box>
        <Box>
            <Chip
                variant='outlined'
                label={formattedDueDate}
            />
        </Box>
    </Box>
  )
}

TaskHeader.propTypes = {
    title: PropTypes.string,
    due_date: PropTypes.string,
};