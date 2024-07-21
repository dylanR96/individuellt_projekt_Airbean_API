import mongoose, {Schema, Document, Model} from "mongoose";

interface IOrder extends Document {
  id: number;
  title: string;
  desc: string;
  price: number;
}


const addOrderSchema: Schema<IOrder> = new Schema({
  id: {
    type: Number,
    require: [true, "Id is required"]
  },
  title: {
    type: String,
    require: [true, "Title is required"]
  },
  desc: {
    type: String,
    require: [true, "Description is required"]
  },
  price: {
    type: Number,
    require: [true, "Price is required"]
  },
})

const orders: Model<IOrder> = mongoose.model<IOrder>("orders", addOrderSchema)

export default orders
