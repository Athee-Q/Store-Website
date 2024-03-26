import { Schema, model, models } from "mongoose";

const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export const Category = models?.Category || model('Category',CategoriesSchema)