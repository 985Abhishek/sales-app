import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";

const EditProductDialog = ({
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
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Product ID"
          value={formData.productId}
          onChange={(e) => handleChange("productId", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Stack Quantity"
          value={formData.stackQuantity}
          onChange={(e) => handleChange("stackQuantity", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Price"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
          fullWidth
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 2 }} />
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Tax</InputLabel>
          <Select
            multiple
            value={formData.tax}
            onChange={(e) => handleChange("tax", e.target.value)}
            input={<OutlinedInput label="Tax" />}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 2 }} />
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
        <Button onClick={handleSave}  color="primary">

          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
