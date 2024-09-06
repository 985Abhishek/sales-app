import React from "react";
import CategoryForm from "../components/forms/CategoryForm";
import "./CategoryPage.css";

const CategoryPage = () => {
  return (
    <>
      <div className="categorypage">
        <h1 style={{marginLeft: "800px"}}>Manage Category</h1>
        <CategoryForm></CategoryForm>
      </div>
      
    </>
  );
};

export default CategoryPage;
