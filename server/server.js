const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");

require("dotenv").config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (res) => {
  res.send("server is running on port 5000");
});

const instance = new Razorpay({
  key_id: "rzp_test_BcNU8Khopo7YPq",
key_secret:"TU3G0NFfqs3GcEQPAmT0zQhG"
  
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body; 
  const options = {
    amount: amount * 100, 
    currency: "INR",
    receipt: "order_rcptid_11",
  };
// asdftgyhjkasdfghwerg





  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
