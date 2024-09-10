import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const AddDialog = ({ open, handleClose, handleSave, handleChange }) => {
  const { formData } = useSelector((state) => state.category);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Name" fullWidth value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'white', backgroundColor: 'red' }} onClick={handleClose}>
          Cancel
        </Button>
        <Button style={{ color: 'white', backgroundColor: 'rgb(76, 175, 80)' }} onClick={handleSave}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
