import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
    customerId: mongoose.Schema.Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const AccountSchema: Schema = new Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Customer id is quired'], ref: 'Customer' },
        name: { type: String, required: [true, 'The bank name is required'], }
    },
    { timestamps: true }
);

export default mongoose.model<IAccount>('Account', AccountSchema);
