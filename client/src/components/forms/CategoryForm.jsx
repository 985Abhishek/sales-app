<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, saveCategories } from '../../utils/localSotrage';
=======
// import { useSelector } from 'react-redux';
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addCategory,
//   deleteCategory,
//   editCategory,
//   setCategories,
// } from "../../store/categorySlice";
// import { loadCategories, saveCategories } from "../../utils/localSotrage";
// import "../forms/categoryform.css"

// const CategoryForm = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.category.categories || []);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(null);

//   useEffect(() => {
//     const storedCategories = loadCategories();
//     if (storedCategories.length > 0) {
//       dispatch(setCategories(storedCategories));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     saveCategories(categories);
//   }, [categories]);

//   const handleAdd = () => {
//     const newCategory = {
//       id: Date.now(),
//       name,
//       description,
//     };
//     dispatch(addCategory(newCategory));
//     setName("");
//     setDescription("");
//   };

//   const handleEdit = (id) => {
//     const updatedData = { name, description };
//     dispatch(editCategory({ id:editingId, updatedData }));
//     setEditingId(null);
//     setDropdownVisible(null);
//     setName("");
//   setDescription("");
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteCategory(id));
//     setDropdownVisible(null);
//   };

//   const toggleDropdown = (id) => {
//     if (dropdownVisible === id) {
//       setDropdownVisible(null);
//     } else {
//       setDropdownVisible(id);
//     }
//   };
//   const handleEditClick = (id) => {
//     const categoryToEdit = categories.find((category) => category.id === id);
//     setName(categoryToEdit.name);
//     setDescription(categoryToEdit.description);
//     setEditingId(id);
//   };

//   return (
//     <div className="form-container">
//       <table className="category-table">
//         <thead>
//           <tr>
//             <th>Serial Number</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category, index) => (
//             <tr key={categories.id}>
//               <td>{index + 1}</td>
//               <td>{category.name}</td>
//               <td>{category.description}</td>
//               <td>
//                 <div className="dropdown">
//                   <button
//                     onClick={() => toggleDropdown(category.id)}
//                     className="three-dots"
//                   >
//                     &#x2026;
//                   </button>
//                   {dropdownVisible === category.id && (
//                     <div className="dropdown-content">
//                       <button onClick={() => handleEditClick(category.id)}>
//                         Edit
//                       </button>
//                       <button onClick={() => handleDelete(category.id)}>
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="form-controls">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         {editingId ? (
//           <button onClick={() => handleEdit(editingId)}>Save Changes</button>
//         ) : (
//           <button onClick={handleAdd}>Add Category</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
>>>>>>> 33f0aa60a02deb938e78e1a2dba2079c9989bc67
import {
  addCategory,
  confirmDialog,
  deleteCategory,
  editCategory,
<<<<<<< HEAD
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
=======
  hideDialog,
  resetForm,
  setCategories,
  setFormValues,
  showDialog,
} from "../../store/categorySlice";
import { loadCategories, saveCategories } from "../../utils/localSotrage";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories || []);
  const { name, description, editingId } = useSelector(
    (state) => state.category.form
  );
  const { dialog } = useSelector((state) => state.category);
>>>>>>> 33f0aa60a02deb938e78e1a2dba2079c9989bc67

  useEffect(() => {
    const storedCategories = loadCategories();
    if (storedCategories.length) {
      dispatch(setCategories(storedCategories));
    }
  }, [dispatch]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

<<<<<<< HEAD
  const handlePageChange = () => {
    dispatch(setPage(newPage));
=======
  const handleAdd = () => {
    const newCategory = {
      id: Date.now(),
      name,
      description,
    };
    
    dispatch(addCategory(newCategory))
    dispatch(resetForm());
    dispatch(hideDialog());
>>>>>>> 33f0aa60a02deb938e78e1a2dba2079c9989bc67
  };
   

<<<<<<< HEAD
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
=======
  const handleEdit = () => {
    const updatedData = { name, description };
    dispatch(editCategory({ id: editingId, updatedData }));
    dispatch(resetForm());
    dispatch(hideDialog());
  };

  const handleDelete = () => {
    dispatch(deleteCategory(dialog.type));
    dispatch(hideDialog());
  };

  const handleEditClick = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    dispatch(
      setFormValues({
        name: categoryToEdit.name,
        description: categoryToEdit.description,
      })
    );
  //  dispatch(editingId(id));
    dispatch(
      showDialog({
        type: "id",
        confrimActionType: "EDIT_CATEGORY",
      })
    );
  };

  const handleDeleteClick = (id) => {
    dispatch(
      showDialog({
        type: id,
        confirmActionType: "DELETE_CATEGORY",
      })
    );
  };

  const handleFieldChange = (field) => (e) => {
    dispatch(
      setFormValues({
        [field]: e.target.value,
      })
    );
>>>>>>> 33f0aa60a02deb938e78e1a2dba2079c9989bc67
  };

  return (
    <div>
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
<<<<<<< HEAD
          {paginatedCategories.map((category, index) => (
=======
          {categories.map((category, index) => (
>>>>>>> 33f0aa60a02deb938e78e1a2dba2079c9989bc67
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <div className="dropdown">
<<<<<<< HEAD
                  <button onClick={() => toggleDropDown(category.id)} className="three-dots">
                    &#x2026;
                  </button>
                  {dropDownVisible === category.id && (
                    <div className="dropdown-content">
                      <button onClick={() => handleEditClick(category.id)}>Edit</button>
                      <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </div>
                  )}
=======
                  <button
                    onClick={() => handleEditClick(category.id)}
                    className="three-dots"
                  >
                    &#x2026;
                  </button>
                  <div className="dropdown-content">
                    <button onClick={() => handleEditClick(category.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(category.id)}>
                      Delete
                    </button>
                  </div>
>>>>>>> 33f0aa60a02deb938e78e1a2dba2079c9989bc67
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-controls">
<<<<<<< HEAD
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
=======
        <button
          onClick={() =>
            dispatch(showDialog({ type: "add", confirmActionType: "ADD_CATEGORY" }))
          }
        >
          Add Category
        </button>
      </div>

      {dialog.visible && (
        <div className="dialog">
          {dialog.type === "delete" ? (
            <>
              <p>Are you sure you want to delete this category?</p>
              <button
                onClick={() => {
                  if (dialog.confirmActionType === "DELETE_CATEGORY") {
                    handleDelete();
                  }
                }}
              >
                Confirm
              </button>
              <button onClick={() => dispatch(hideDialog())}>Cancel</button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleFieldChange("name")}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleFieldChange("description")}
              />

              <button
                onClick={() => {
                  if (dialog.confirmActionType === "ADD_CATEGORY") {
                    handleAdd();
                  } else if (dialog.confirmActionType === "EDIT_CATEGORY") {
                    handleEdit();
                  }
                }}
              >
                {dialog.type === "add" ? "Add Category" : "Save Changes"}
              </button>
              <button onClick={() => dispatch(hideDialog())}>Cancel</button>
            </>
          )}
        </div>
      )}
>>>>>>> 33f0aa60a02deb938e78e1a2dba2079c9989bc67
    </div>
  );
};

export default CategoryForm;
