const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: false,
      trim: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9_-]+$/, // Username format validation using a regular expression
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: (password) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password),
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit.",
      },
    },

    image: { type: String, trim: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = models?.User || model("User", UserSchema);

export default User;
