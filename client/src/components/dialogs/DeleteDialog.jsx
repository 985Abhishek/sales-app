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
open,
  handleCloseDeleteDialog,
  handleConfirmDelete,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this tax?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style ={{color:"white", backgroundColor:"red"}} onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button style ={{color:"white", backgroundColor:"green"}} onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
