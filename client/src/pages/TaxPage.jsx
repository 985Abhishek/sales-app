import React from "react";
import TaxForm from "../components/forms/TaxForm";
import "./TaxPage.css";

const TaxPage = () => {
  return (
    <div className="taxPage">
     <h1 style={{marginLeft:"65%"}}>Manage Tax</h1> 
      <TaxForm />
    </div>
  );
};

export default TaxPage;
