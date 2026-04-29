import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, className = '', ...props }) => {
  return (
    <MuiButton className={`rounded-md ${className}`} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
