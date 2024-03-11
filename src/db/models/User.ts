import { Schema, model } from "mongoose";

interface User {
  name: string;
  lastname: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String, required: true }
});

export default model<User>("User", UserSchema);
