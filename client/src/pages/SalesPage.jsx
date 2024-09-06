import React, { useEffect, useState } from 'react';
import SalesForm from '../components/forms/SalesForm';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './SalesPage.css';
import { fetchDataFromLocalStorage } from '../store/apiDataSlice';

const SalesPage = () => {
  const dispatch = useDispatch();
  
  const { data = [], status = 'idle', error = null } = useSelector((state) => state.apiData || {});

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDataFromLocalStorage());
    }
  }, [status, dispatch]);

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const product = data.find((product) => product.id === productId);
    
    if (product) {

      const isAlreadySelected = selectedProducts.some(item => item.id === productId);
      
      if (!isAlreadySelected) {
        setSelectedProducts([...selectedProducts, product]);
      }
      
     
      e.target.value = "";
    }
  }
  
  return (
    <div className="sales">
      <h1>CART</h1>

      <FormControl fullWidth>
        <InputLabel id="product-select-label">Select a Product</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          value=""
          onChange={handleProductSelect}
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedProducts.length > 0 ? (
        <SalesForm selectedProducts={selectedProducts} />
      ) : (
        <p>Please select a product to view details.</p>
      )}
    </div>
  );
};

export default SalesPage;
