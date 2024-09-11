import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, saveCategories } from '../../utils/localSotrage';
import './CategoryForm.css';
import {
  addCategory,
  closeAddDialog,
  closeDeleteDialog,
  closeEditDialog,
  deleteCategory,
  editCategory,
  openAddDialog,
  openDeleteDialog,
  openEditDialog,
  resetFormData,
  setCategories,
  setDropDownVisible,
  setEditingId,
  setDeletingId,
  setPage,
  updateFormData
} from '../../store/categorySlice';
import { Pagination } from '@mui/material';
import AddDialog from '../dialogs/categorydialogs/AddDialog';
import EditDialog from '../dialogs/categorydialogs/EditDialog';
import DeleteDialog from '../dialogs/categorydialogs/DeleteDialogs';

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { categories, formData, editingId, dropDownVisible, page, rowsperpage, addDialogOpen, editDialogOpen, deleteDialogopen } =
    useSelector((state) => state.category);
  const { deleteCategoryId } = useSelector((state) => state.category);

  useEffect(() => {
    const storedCategories = loadCategories();
    if (storedCategories.length) {
      dispatch(setCategories(storedCategories));
    }
  }, [dispatch]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const handlePageChange = (event, newPage) => {
    dispatch(setPage(newPage));
  };
  const paginatedCategories = categories.slice((page - 1) * rowsperpage, page * rowsperpage);

  const handleOpenAddDialog = () => {
    dispatch(resetFormData());
    dispatch(openAddDialog(true));
  };
  const handleCloseAddDialog = () => {
    dispatch(closeAddDialog(false));
    dispatch(resetFormData());
  };

  const handleAdd = () => {
    if (!(formData.name && formData.description)) {
      alert('Please fill all the fields');
      return;
    }
    const newCategory = {
      ...formData,
      id: Date.now()
    };
    dispatch(addCategory(newCategory));
    handleCloseAddDialog();
  };
  const handleOpenEditDialog = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    dispatch(updateFormData(categoryToEdit));
    dispatch(setEditingId(id));
    dispatch(openEditDialog());
  };

  const handleCloseEditDialog = () => {
    dispatch(closeEditDialog(true));
    dispatch(setEditingId(null));
    dispatch(resetFormData());
  };
  const handleOpenDeleteDialog = (id) => {
    console.log(id, 'id');

    dispatch(setDeletingId(id));
    dispatch(openDeleteDialog());
  };

  const handleCloseDeleteDialog = () => {
    dispatch(closeDeleteDialog());
  };

  const toggleDropDown = (id) => {
    dispatch(setDropDownVisible(dropDownVisible === id ? null : id));
  };

  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ [field]: value }));
  };

  const handleSaveChanges = () => {
    const updatedData = {
      editingId,
      ...formData
    };
    dispatch(editCategory(updatedData));
    dispatch(setEditingId(null));
    dispatch(closeEditDialog());
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCategory(deleteCategoryId));
    dispatch(closeDeleteDialog());
  };

  return (
    <>
      <div className="form-container">
        <div className="form-controls">
          <button onClick={handleOpenAddDialog}>Add Category</button>
        </div>
        <table className="category-table">
          <thead>
            <tr key={categories.id}>
              <th>Serial Number</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <div className="dropdown">
                    <button onClick={() => toggleDropDown(category.id)} className="three-dots">
                      &#8942;
                    </button>
                    {dropDownVisible === category.id && (
                      <div className="dropdown-content">
                        <button onClick={() => handleOpenEditDialog(category.id)}>Edit</button>
                        <button onClick={() => handleOpenDeleteDialog(category.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          count={Math.ceil(categories.length / rowsperpage)}
          page={page}
          onChange={handlePageChange}
          rowsperpage={rowsperpage}
          variant="outlined"
          shape="rounded"
        />
        <AddDialog
          open={addDialogOpen}
          handleClose={handleCloseAddDialog}
          handleSave={handleAdd}
          handleChange={(field, value) => dispatch(updateFormData({ [field]: value }))}
        />
        <EditDialog
          open={editDialogOpen}
          handleClose={handleCloseEditDialog}
          handleSave={handleSaveChanges}
          formData={formData}
          handleChange={handleInputChange}
        />

        <DeleteDialog open={deleteDialogopen} handleClose={handleCloseDeleteDialog} handleConfirmDelete={handleConfirmDelete} />
      </div>
    </>
  );
};

export default CategoryForm;
