import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Checkbox } from "@mui/material";
import { toggleEditMode } from "../../store/RandomItemSlice";

const EditDi = ({ open, handleClose, handleSave, formData, handleChange, editMode, toggleEditMode}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          field= "name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          field = "description"
          fullWidth
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
       
         
        <div>
          <Checkbox
            checked={formData.taxType === "Fixed"}
            onChange={(e) => handleChange("taxType", "Fixed")}
            inputProps={{ "aria-label": "fixed checkbox" }}
          />
          <label>Fixed</label>

          <Checkbox
            checked={formData.taxType === "Percentage"}
            onChange={(e) => handleChange("taxType", "Percentage")}
            inputProps={{ "aria-label": "percentage checkbox" }}
          />
          <label>Percentage</label>
        </div>

        {/* {formData.taxType !== undefined && (
          <TextField
            margin="dense"
            label="Tax Type"
            select
            fullWidth
            value={formData.taxType}
            onChange={(e) => handleChange("taxType", e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="Fixed">Fixed</option>
            <option value="Percentage">Percentage</option>
          </TextField>
        )} */}
       
        {/* {formData.taxType !== undefined && (
          <TextField
            margin="dense"
            label="Tax Type"
            select
            fullWidth
            value={formData.taxType}
            onChange={(e) => handleChange("taxType", e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="Fixed">Fixed</option>
            <option value="Percentage">Percentage</option>
          </TextField>
        )} */}
         <TextField
          margin="dense"
          label="amount"
          field = "amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button  style ={{backgroundColor:"red", color:"white"}}onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button style ={{backgroundColor:"green", color:"white"}} onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDi;
