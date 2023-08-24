import mongoose from "mongoose";

const payerSchema = new mongoose.Schema({
  nick: { type: String, required: true },
  email: { type: String, required: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payer",
    },
  ],
});

const Payer = mongoose.models.Payer || mongoose.model("Payer", payerSchema);

export default Payer;
