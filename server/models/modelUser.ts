import mongoose, {Schema, Document, Model} from "mongoose";
import mongooseBcrypt from 'mongoose-bcrypt';

interface IUser extends Document {
  username: string;
  password: string;
}

const addUserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    require: [true, "Username is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    becrypt: true,
  },
})



addUserSchema.plugin(mongooseBcrypt);

const users: Model<IUser> = mongoose.model<IUser>("users", addUserSchema);

export default users;