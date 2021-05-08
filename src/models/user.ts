import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface IUserSchema extends mongoose.Document {
  email: string;
  password: string;
}

// user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  saved: {
    type: Array,
    default: []
  }
});

// pre hook for password hashing
userSchema.pre("save", async function (this: IUserSchema, next: any) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// export
export const User = mongoose.model("user", userSchema);
