import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./SalesForm.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addSalesList, setSalesList } from "../../store/salesListSlice";
import { loadSalesList } from "../../utils/localSotrage";

const SalesForm = ({ selectedProducts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const salesList = useSelector((state) => state.salesList.salesList);
  const [productData, setProductData] = useState([]);
  

  useEffect(() => {
    dispatch(setSalesList(salesList));
  }, [dispatch]);

  useEffect(() => {
    const newProducts = selectedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: 1,
      amount: product.Amount || 3700,
      tax: (product.Amount || 3700) * 0.1,
      totalPrice: (product.Amount || 3700) * 1.1,
    }));
    setProductData(newProducts);
  }, [selectedProducts]);

  console.log(selectedProducts);

  const handleQuantityChange = (id, newQuantity) => {
    setProductData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              tax: item.amount * 0.1 * newQuantity,
              totalPrice:
                item.amount * newQuantity + item.amount * 0.1 * newQuantity,
            }
          : item
      )
    );
  };

  if (productData.length === 0) {
    return <div>No data available.</div>;
  }
  const PaymentHandler = async () => {
    const totalPrice = productData.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    const options = {
      key: "rzp_test_BcNU8Khopo7YPq",
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      name: "Designing Solutions",
      description: "Test Transaction",
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        navigateToShowSales();
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "8264101671",
      },
      modal: {
        ondismiss: () => {
          navigateToShowSales(); 
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open()
  };

  const navigateToShowSales = () => {
    
    const invoice = Date.now();
    const totalTax = productData.reduce((acc, item) => acc + item.tax, 0);
    const totalPrice = productData.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    const newSale = {
      invoice,
      numberOfProducts: productData.length,
      totalTax,
      totalPrice,
    };

    dispatch(addSalesList(newSale));
    navigate("/showsale");
  };

  return (
    <div className="sales-form">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Total Tax</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.amount.toFixed(2)}</td>
              <td>
                <div className="quantity-counter">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{item.tax.toFixed(2)}</td>
              <td>{item.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals">
        <p>
          Total Tax:{" "}
          {productData.reduce((acc, item) => acc + item.tax, 0).toFixed(2)}
        </p>
        <p>
          Total Price:{" "}
          {productData
            .reduce((acc, item) => acc + item.totalPrice, 0)
            .toFixed(2)}
        </p>
      </div>
      <div className="submit-button">
        <Button onClick={PaymentHandler} variant="contained">
          Pay now
        </Button>
      </div>
    </div>
  );
};

export default SalesForm;
