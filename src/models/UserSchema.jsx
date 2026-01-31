import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    address: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      index: true,
      enum: ["male", "female"],
    },

    password: {
      type: String,
      required: function () {
        return this.provider === "credentials";
      },
      select: false,
      minlength: 12,
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    providerId: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    profileImage: {
      type: String,
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        color: String,
        size: String,
        quantity: { type: Number, default: 1 },
      },
    ],

    compare: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    checkout: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        color: { type: String, required: true }, // Required as per your request
        size: { type: String, required: true }, // Required as per your request
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true },
);
// password hashing
UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// login user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (user) {
    let auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Email isn't registered");
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
