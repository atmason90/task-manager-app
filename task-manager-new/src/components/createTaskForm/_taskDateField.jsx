import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';


export const TaskDateField = (props) => {
    // Destructure props
    const { 
        value = new Date(), 
        disabled = false, 
        onChange = (date) => console.log(date), 
    } = props;
    
    return (
    <>
        <LocalizationProvider 
            dateAdapter={AdapterDateFns}
        >
            <DesktopDatePicker 
                label='Task Date'
                inputFormat='yyyy/MM/dd'
                value={value}
                onChange={onChange}
                disabled={disabled}
                renderInput={(params) => (
                    <TextField {...params} />
                )}
                />
        </LocalizationProvider>
    </>
  )
};

TaskDateField.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
}