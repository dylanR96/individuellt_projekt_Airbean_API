import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export interface I_UserDocument extends mongoose.Document {
  username: string;
  password: string;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: [true, "Username is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    becrypt: true,
  },
})

const saltrounds = 8;

UserSchema.pre('save', async function (next) {
  const user = this;
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltrounds)
  }
})


export const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);
