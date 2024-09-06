import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  editCategory,
  setCategories,
} from "../../store/categorySlice";
import { loadCategories, saveCategories } from "../../utils/localSotrage";
import "../forms/categoryform.css"

const CategoryForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);

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
    dispatch(addCategory(newCategory));
    setName("");
    setDescription("");
  };

  const handleEdit = (id) => {
    const updatedData = { name, description };
    dispatch(editCategory({ id:editingId, updatedData }));
    setEditingId(null);
    setDropdownVisible(null);
    setName(""); 
  setDescription(""); 
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    setDropdownVisible(null);
  };

  const toggleDropdown = (id) => {
    if (dropdownVisible === id) {
      setDropdownVisible(null);
    } else {
      setDropdownVisible(id);
    }
  };
  const handleEditClick = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    setName(categoryToEdit.name);
    setDescription(categoryToEdit.description);
    setEditingId(id);
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
          {categories.map((category, index) => (
            <tr key={categories.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <div className="dropdown">
                  <button
                    onClick={() => toggleDropdown(category.id)}
                    className="three-dots"
                  >
                    &#x2026;
                  </button>
                  {dropdownVisible === category.id && (
                    <div className="dropdown-content">
                      <button onClick={() => handleEditClick(category.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(category.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-controls">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editingId ? (
          <button onClick={() => handleEdit(editingId)}>Save Changes</button>
        ) : (
          <button onClick={handleAdd}>Add Category</button>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
