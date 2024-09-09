import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categorySlice";
import { fetchTaxes } from "../../store/taxSlice";
import { addProduct, deleteProduct, editProduct, setProduct } from "../../store/productSlice";
import { Button, MenuItem, Select, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { loadProducts, saveProducts } from "../../utils/localSotrage";
import "./ProductForm.css";
import { Bounce, toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";




const ProductForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log("",categories);
  
  const taxes = useSelector((state) => state.tax.taxes);
  console.log("taxes",  taxes);

  
  const products = useSelector((state) => state.product.products);
  console.log('categories---',categories)

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    stockQuantity: "",
    price: "",
    category: [],
    tax: [],
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingTax, setEditingTax] = useState(null);
  const [selectedTaxId, setSelectedTaxId] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [multiSelectOpen, setMultiSelectOpen] = useState(false);

  const recordsPerPage = 10;

  const totalPages = Math.ceil(taxes.length / recordsPerPage);

  // Slice the taxes array to show only the records for the current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  useEffect(()=>{
const storedProducts = loadProducts();
if(storedProducts.length > 0) {
dispatch(setProduct(storedProducts))
}
 },[dispatch]);

 useEffect(()=> {
  saveProducts(products);
 },[products]);

  

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTaxes());
  }, [dispatch]);

  const handleOpenAddDialog = () => {
    dispatch(resetForm());
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    dispatch(resetForm());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryChange = (event) => {
    setProductData({ ...productData, category: event.target.value });
  };

  const handleSaveProduct = () => {
    console.log("hhhhh---");
    
    if (!productData.name || !productData.stockQuantity || !productData.price || !productData.category || !productData.tax) {
      toast.error("Please fill in all required fields ",{
          position:"top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
      });
      
    }
    else if (editingProduct) {
      dispatch(editProduct({ ...productData, id: editingProduct.id }));
    } else  {
      dispatch(addProduct({ ...productData, id: Date.now() }));
    }
    handleCloseDialog();
   // toast.success("Product saved successfully!");
  };

  const handleOpenDialog = (product) => {
    setEditingProduct(product);
    setProductData({
      name: product?.name || "",
      description: product?.description || "",
      stockQuantity: product?.stockQuantity || "",
      price: product?.price || "",
      category: product?.category || [],
      tax: product?.tax || [],
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    setProductData({
      name: "",
      description: "",
      productId: "",
      stockQuantity: "",
      price: "",
      category: [],
      tax: [],
    });
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Product deleted successfully!");
  };

  const handleMenuClick = (event, id) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedProductId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedProductId(null);
  };

  
  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  const handleToggleDeleteMode = () => {
    dispatch(toggleDeleteMode());
  };

  const handleTaxChange = (taxValues) => {
    setProductData({ ...productData, tax: taxValues });
  }
  
  return (
    <div className = "form-container">
    {/* <Toaster
  position="top-center"
  reverseOrder={false}
/> */}
      <Button variant="contained" color="primary" style={{backgroundColor: "black", marginBottom:"20px", marginLeft: "600px"}} onClick={() => handleOpenDialog(null)}>
        Add Product
      </Button>

      <table className="tax-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Stock Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tax</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.stockQuantity}</td>
              <td>{product.price}</td>
              <td>{product.category.join(", ")}</td>
              <td>{product.tax.join(", ")}</td>
              <td>
                
                <Button onClick={() => handleOpenDialog(product)}>Edit</Button>
                <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            fullWidth
            value={productData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={productData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="stockQuantity"
            label="Stock Quantity"
            fullWidth
            value={productData.stockQuantity}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            fullWidth
            value={productData.price}
            onChange={handleInputChange}
            required
          />

          <Select
            multiple
            value={productData.category}
            onChange={(event) => { 
              handleCategoryChange(event)
            //  setMultiSelectOpen(false)
            }}
            // open = {multiSelectOpen}
            // onOpen={()=>setMultiSelectOpen(true)}
            // onClose={()=>setMultiSelectOpen(false)}
            fullWidth
            displayEmpty
            renderValue={(selected) =>
              selected.length === 0 ? "Select Categories" : selected.join(", ")
              
            }
            required
          >
            {/* {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))} */}
            {products && Array.isArray(products) ? (
  categories.map((category) => (
    <MenuItem key={category.id} value={category.name}>
      {category.name}
    </MenuItem>
  ))
) : (
  <MenuItem disabled>No categories available</MenuItem>
)}
          </Select>

          <Select
            multiple
            value={productData.tax}
            onChange={ (event)=>{handleTaxChange(event.target.value)
              setMultiSelectOpen(false)
            }}
            
            fullWidth
            displayEmpty
            renderValue={(selected) =>
              selected.length === 0 ? "Select Taxes" : selected.join(", ")
            }
            required
          >
           
       {taxes && Array.isArray(taxes) ? (
  taxes.map((tax) => (
    <MenuItem key={tax.id} value={tax.name}>
      {tax.name}
    </MenuItem>
  ))
) : (
  <MenuItem disabled>No taxes available</MenuItem>
)}


          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct} color="primary">
            {editingProduct ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductForm;

