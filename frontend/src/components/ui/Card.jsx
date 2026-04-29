import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';

const Card = ({ children, className = '', ...props }) => {
  return (
    <MuiCard className={`shadow-md rounded-lg ${className}`} {...props}>
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
