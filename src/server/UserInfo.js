import { Schema, model, models } from "mongoose";

const UserInfoSchema = new Schema(
  {
    admin: { type: Boolean, default: false },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: {
      type: String,
      trim: true,
      match: /^\d{10}$/, // Basic validation for a 10-digit phone number
    },
    street: { type: String, trim: true },
    town: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: {
      type: String,
      trim: true,
      match: /^[0-9]{6}$/, // Basic validation for a 5-digit postal code
    },
  },
  { timestamps: true }
);
const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);

export default UserInfo;
