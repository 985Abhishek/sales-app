
import React, { useEffect, useState } from "react";
import "./TaxForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addTax, deleteTax, editTax, setTaxes } from "../../store/taxSlice";
import { updateField, resetForm } from "../../store/taxDataSlice";
import { loadTaxes, saveTaxes } from "../../utils/localSotrage";
import { IconButton, Menu, MenuItem, Pagination } from "@mui/material";
import { calculateAmount, setRandomItems, toggleDeleteMode, toggleEditMode } from "../../store/RandomItemSlice";
import EditDi from "../dialogs/EditDi";
import AddTaxDialog from "../dialogs/Addtaxdialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteDialog from "../dialogs/DeleteDialog";


const TaxForm = () => {
  const dispatch = useDispatch();
  const taxes = useSelector((state) => state.tax.taxes);
  const formData = useSelector(
    (state) =>
      state.form || {
        name: "",
        description: "",
        amount: "",
        taxType: "",
        taxedAmount: "",
      }
  );
  const itemList = useSelector((state) => state.randomitemSlice || []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingTax, setEditingTax] = useState(null);
  const [selectedTaxId, setSelectedTaxId] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

   // Calculate total pages
   const totalPages = Math.ceil(taxes.length / recordsPerPage);

   // Slice the taxes array to show only the records for the current page
   const paginatedTaxes = taxes.slice(
     (currentPage - 1) * recordsPerPage,
     currentPage * recordsPerPage
   );
 

  // Open Add Tax Dialog
  const handleOpenAddDialog = () => {
    dispatch(resetForm());
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    dispatch(resetForm());
  };

  const handleOpenDialog = (tax) => {
    setEditingTax(tax);
    dispatch(
      updateField({ field: "name", value: tax.name || ""  })
    );
    dispatch(
      updateField({ field: "description", value: tax.description || "" })
    );
    dispatch(updateField({ field: "amount", value: tax.amount || "" }));
    dispatch(updateField({ field: "taxType", value: tax.taxType || "" }));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTax(null);
    dispatch(resetForm());
  };

  // Open and Close Delete Confirmation Dialog
  const handleOpenDeleteDialog = (id) => {
    setSelectedTaxId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedTaxId(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    dispatch(deleteTax({ id: selectedTaxId }));
    handleCloseDeleteDialog();
  };


  const handleSaveChanges = () => {
    if (editingTax) {
      const taxedAmount = handleTaxCaluclation(formData.amount, formData.taxType); // Recalculate taxed amount
      
      const updatedTax = {
        id: editingTax.id,
        name: formData.name,
        description: formData.description,
        amount: formData.amount,
        taxType: formData.taxType,
        taxedAmount: taxedAmount, // Assign the recalculated taxed amount
      };
  
      dispatch(editTax(updatedTax));
      handleCloseDialog();
    }
  };

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  console.log("formdata", formData);

  const handleDelete = (id) => {
    dispatch(deleteTax({ id }));
  };

  const handleAddTax = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.amount ||
      !formData.taxType
    ) {
      alert("All fields must be filled!");
      return;
    }
    const taxedAmount = handleTaxCaluclation(formData.amount, formData.taxType);

    const newTax = {
      id: Date.now(), // Ensure ID is unique
      ...formData,
      taxedAmount:taxedAmount
    };


    dispatch(addTax(newTax));
    handleCloseAddDialog();
  };

  const handleTaxCaluclation = (amount, taxType) => {
    let taxedAmount = 0;
    if (taxType === "Percentage") {
      taxedAmount = parseFloat(amount) + parseFloat(amount) * 0.01; // Assuming 5% tax
    } else if (taxType === "Fixed") {
      taxedAmount = parseFloat(amount) + parseFloat(amount) + 10; // Assuming a fixed tax of 5 units
    }
    
    return taxedAmount.toFixed(2); 
   
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEdit = (id) => {
    const updatedData = { ...formData };
    dispatch(editTax({ id, updatedData }));
  };

  useEffect(() => {
    const storedTaxes = loadTaxes();
    if (storedTaxes.length > 0) {
      dispatch(setTaxes(storedTaxes));
    }
  }, [dispatch]);

  useEffect(() => {
    saveTaxes(taxes);
  }, [taxes]);

  // Menu Handlers for Three Dots
  const handleMenuClick = (event, id) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedTaxId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedTaxId(null);
  };

  
  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  const handleToggleDeleteMode = () => {
    dispatch(toggleDeleteMode());
  };
  return (
    <div className="form-container">
      <button className="add-tax-button" onClick={handleOpenAddDialog}>
        Add Tax
      </button>

      <table className="tax-table">
        <thead>
          <tr>
            <th>serial Number</th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Tax Type</th>
            <th>Taxed Amount</th>
            <th>Actions</th>
           
          </tr>
        </thead>
        <tbody>
          {paginatedTaxes.map((tax, index) => (
            <tr key={tax.id}>
              <td>{ (currentPage -1)* recordsPerPage + index + 1}</td>
              <td>{tax.name}</td>
              <td>{tax.description}</td>
              <td>{tax.amount}</td>
              <td>{tax.taxType}</td>
              <td>{tax.taxedAmount}</td> 
             
              
              <td>
                <IconButton onClick={(event) => handleMenuClick(event, tax.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl) && selectedTaxId === tax.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleOpenDialog(tax);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleOpenDeleteDialog(tax.id);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </td>
             
             
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination  count={Math.ceil(taxes.length / recordsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton />

        
      <AddTaxDialog
        open={addDialogOpen}
        handleClose={handleCloseAddDialog}
        handleSave={handleAddTax}
        formData={formData}
        handleChange={(field, value) => dispatch(updateField({ field, value }))}
        handleTax={handleTaxCaluclation}
      />

      <EditDi
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleSave={handleSaveChanges}
        formData={formData}
        handleChange={handleInputChange}
        edit={handleEdit}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleConfirmDelete={handleConfirmDelete}
      ></DeleteDialog>
    </div>
  );
};

export default TaxForm;
