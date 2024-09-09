import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, saveCategories } from '../../utils/localSotrage';
import {
  addCategory,
  deleteCategory,
  editCategory,
  openAddDialog,
  resetFormData,
  setCategories,
  setDropDownVisible,
  setEditingId,
  setPage,
  updateFormData
} from '../../store/categorySlice';
import { Pagination } from '@mui/material';
import AddDialog from '../dialogs/categorydialogs/AddDialog';

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { categories, formData, editingId, dropDownVisible, page, rowsperpage } = useSelector((state) => state.category);

  useEffect(() => {
    const storedCategories = loadCategories();
    if (storedCategories.length) {
      dispatch(setCategories(storedCategories));
    }
  }, [dispatch]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const handlePageChange = () => {
    dispatch(setPage(newPage));
  };

  const paginatedCategories = categories.slice((page - 1) * rowsperpage, page * rowsperpage);

  const handleAdd = () => {
    if(!(formData.name && formData.description)){
      alert("Please fill all the fields");
      return;
    }
    const newCategory = {
      id: Date.now(),
      name: formData.name,
      description: formData.description
    };
    dispatch(addCategory(newCategory));
    dispatch(resetFormData());
  };

const handleCloseAddDialog = () => {
    dispatch(openAddDialog(false));
    dispatch(resetFormData())
  };

  const handleSaveChanges = () => {
    if(editingId) {
      const updatedData ={
        id : editingId.id,
        ...formData
      };
      dispatch(editCategory(updatedData))
      handleCloseAddDialog()
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    dispatch(setDropDownVisible(null));
  };

  const handleEdit = () => {
    dispatch(editCategory({ id: editingId, updatedData: formData }));
    dispatch(setEditingId(null));
    dispatch(resetFormData());
  };

  const toggleDropDown = (id) => {
    if (dropDownVisible == id) {
      dispatch(setDropDownVisible(null));
    } else {
      dispatch(setDropDownVisible(id));
    }
  };

  const handleEditClick = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    dispatch(updateFormData(categoryToEdit));
    dispatch(setEditingId(id));
  };

  const handleInputChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  return (
    <div className="form-container">
      <table className="category-table">
        <thead>
          <tr>
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
                    &#x2026;
                  </button>
                  {dropDownVisible === category.id && (
                    <div className="dropdown-content">
                      <button onClick={() => handleEditClick(category.id)}>Edit</button>
                      <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-controls">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
        {editingId ? <button onClick={handleEdit}>Save Changes</button> : <button onClick={handleAdd}>Add Category</button>}
      </div>
      <Pagination
        count={categories.length}
        page={page}
        onChange={(event, newPage) => {
          dispatch(setPage(newPage));
        }}
        rowsperpage={rowsperpage}
        variant="outlined"
        shape="rounded"
      />
      <AddDialog
      open ={openAddDialog} 
      handleClose = {handleCloseAddDialog}
      handleSave = {handleAdd}
      handleChange = {(field,value)=>dispatch(updateFormData({field, value}))}
      handleSaveChanges = {handleSaveChanges}/>
    </div>
  );
};

export default CategoryForm;
