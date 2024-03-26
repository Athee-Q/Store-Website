import mongoose from "mongoose";

const { Schema, models, model } = require("mongoose");

const ExtraPriceSchema = new Schema ({
  name: String,
  price: Number,
})


const MenuItemsSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category:{
      type: mongoose.Types.ObjectId
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    sizes: {type:[ExtraPriceSchema]},
    extraIngredientPrices: {type:[ExtraPriceSchema]},
  },
  { timestamps: true }
);

const MenuItems = models?.MenuItem || model("MenuItem", MenuItemsSchema);

export default MenuItems;
