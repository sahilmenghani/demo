const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.rzp_test_TdBSY74Q5WxU8x,
  key_secret: process.env.qzUKwzEC3LU8oFwlexVavpzq,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 99900,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);

    res.status(500).json({
      error: "Failed to create order",
      message: error.message,
    });
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
  });
}
