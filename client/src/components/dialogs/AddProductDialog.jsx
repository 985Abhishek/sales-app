import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";

const AddProductDialog = ({
  open,
  handleClose,
  handleSave,
  formData,
  categories,
  taxes,
  handleChange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={formData.name ? "Required" : ""}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          margin="dense"
          error={formData.name === "" ? "Required" : ""}
          helperText={formData.name === "" ? "Required" : ""}
        />
        <TextField
          label="Description"
          value={formData.description }
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          margin="dense"
        />
     
        <TextField
          label="Stock Quantity"
          value={formData.stockQuantity ? "Required" : ""}
          onChange={(e) => handleChange("stockQuantity", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Price"
          value={formData.price ? "Required" : ""}
          onChange={(e) => handleChange("price", e.target.value)}
          fullWidth
          margin="dense"
        />
        <FormControl fullWidth  style={{ marginBottom: 96 }}>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={formData.category? "Required" : ""}
            margin = "dense"
            onChange={(e) => handleChange("category", e.target.value)}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 32 }} />
                ))}
              </div>
            )}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth  style={{ marginBottom: 16 }}>
          <InputLabel>Tax</InputLabel>
          <Select
            multiple
            value={formData.tax ? "Required" : ""}
            margin = "dense"
            onChange={(e) => handleChange("tax", e.target.value)}
            input={<OutlinedInput label="Tax" />}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 32 }} />
                ))}
              </div>
            )}
          >
            {taxes.map((tax) => (
              <MenuItem key={tax} value={tax}>
                {tax}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
