import mongoose, { Schema, Document } from 'mongoose';

interface IAccount extends Document {
    customerId: mongoose.Schema.Types.ObjectId;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}

const AccountSchema: Schema = new Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
        balance: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IAccount>('Account', AccountSchema);
