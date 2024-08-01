import mongoose, { Schema, Document } from 'mongoose';

interface ICustomer extends Document {
  name: string;
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: [true, 'The customer name is required'] },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
