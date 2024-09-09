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
import {
  addCategory,
  confirmDialog,
  deleteCategory,
  editCategory,
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

  useEffect(() => {
    const storedCategories = loadCategories();
    if (storedCategories.length > 0) {
      dispatch(setCategories(storedCategories));
    }
  }, [dispatch]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const handleAdd = () => {
    const newCategory = {
      id: Date.now(),
      name,
      description,
    };
    
    dispatch(addCategory(newCategory))
    dispatch(resetForm());
    dispatch(hideDialog());
  };
   

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
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <div className="dropdown">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-controls">
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
    </div>
  );
};

export default CategoryForm;
