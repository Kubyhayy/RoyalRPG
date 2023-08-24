import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: Number, required: true },
  price: { type: Number, required: true },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payer",
  },
  purchaseDate: { type: Date, default: Date.now },
  expirationDate: {
    type: Date,
    default: +new Date() + 30 * 24 * 60 * 60 * 1000,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
