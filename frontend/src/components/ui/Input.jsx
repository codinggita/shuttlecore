import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ className = '', ...props }) => {
  return (
    <TextField
      variant="outlined"
      className={`w-full ${className}`}
      {...props}
    />
  );
};

export default Input;
