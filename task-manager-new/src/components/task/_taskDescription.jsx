import React from 'react';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

export const TaskDescription = (props) => {
  // Destructure props
  const { description='Lorem ipsum dolor sit amet' } = props;
  return (
    <Box>
        <Typography>
            {description}
        </Typography>
    </Box>
  )
}

TaskDescription.propTypes = {
    description: PropTypes.string,
};
