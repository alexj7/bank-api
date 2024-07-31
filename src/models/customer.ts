import mongoose, { Schema, Document } from 'mongoose';

interface ICustomer extends Document {
  name: string;
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
