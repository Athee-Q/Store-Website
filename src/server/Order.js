import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: { type: String },
    phone: { type: String },
    street: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Order = models?.Order || model("Order", OrderSchema);

export default Order;
