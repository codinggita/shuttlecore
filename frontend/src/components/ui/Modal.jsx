import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const Modal = ({ open, onClose, title, children, className = '', ...props }) => {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
