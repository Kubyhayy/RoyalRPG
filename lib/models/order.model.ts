import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  purchaseDate: { type: Date, default: Date.now },
  target: { String, required: true },
  days: { String, required: true },
  price: { String, required: true },
  expirationDate: { type: Date, required: true },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payer",
    required: true,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
