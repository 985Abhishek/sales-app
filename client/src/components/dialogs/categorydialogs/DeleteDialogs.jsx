import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import React from "react";
  
  const DeleteDialog = ({
  open,handleClose, handleDelete, 
  }) => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this tax?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style ={{color:"white", backgroundColor:"red"}} onClick={handleClose}>Cancel</Button>
            <Button style ={{color:"white", backgroundColor:"green"}} onClick={handleDelete} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default DeleteDialog;
  