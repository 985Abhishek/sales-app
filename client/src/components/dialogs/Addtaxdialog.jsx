import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

const AddTaxDialog = ({ open, handleClose, handleSave,handleChange, formData, handleTax }) => {

      handleSave = {handleAdd}
      const handleSaveClick = (openAddDialog, handleCloseAddDialog, handleAdd, updateFormData) => {
    if (formData.amount && formData.taxType) {
      const id =formData.id || Date.now();
      handleTax(formData.id, formData.taxType);
    }
    handleSave();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Tax</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        
        <TextField
          margin="dense"
          label=""
          select
          fullWidth
          value={formData.taxType}
          onChange={(e) => handleChange("taxType", e.target.value)}
          SelectProps={{ native: true }}

        >
          <option value="Fixed">Fixed</option>
          <option value="Percentage">Percentage</option>
        </TextField>
        <TextField
          margin="dense"
          label="amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button style ={{color:"white", backgroundColor:"red"}}onClick={handleClose}>Cancel</Button>
        <Button style ={{color:"white", backgroundColor:"green"}} onClick={handleSaveClick } >Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaxDialog;
