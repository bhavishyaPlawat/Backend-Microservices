const Razorpay = require("razorpay");
const crypto = require("crypto");
const productModel = require("../models/product.model");
const paymentModel = require("../models/payment.model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createOrder(req, res) {
  try {
    const product = await productModel.findOne();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const options = {
      amount: Math.round((product.price?.amount || 0) * 100),
      currency: product.price?.currency || product.price?.curreny || "INR",
    };

    const order = await razorpay.orders.create(options);

    await paymentModel.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: "PENDING",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
}

async function verifyPayment(req, res) {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    const {
      validatePaymentVerification,
    } = require("../node_modules/razorpay/dist/utils/razorpay-utils.js");

    const result = validatePaymentVerification(
      { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
      signature,
      secret,
    );
    if (result) {
      const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = "COMPLETED";
      await payment.save();
      res.json({ status: "success" });
    } else {
      res.status(400).send("Invalid signature");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error verifying payment");
  }
}

module.exports = {
  createOrder,
  verifyPayment,
};
