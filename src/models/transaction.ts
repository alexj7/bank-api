import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    from: mongoose.Types.ObjectId;
    to?: mongoose.Types.ObjectId;
    amount: number;
    transactionDate: Date;
    description?: string;
    type: 'deposit' | 'withdrawal' | 'send';
}

const TransactionSchema: Schema = new Schema({
    from: { type: mongoose.Types.ObjectId, required: [true, 'Sender account is required'], ref: 'Account' },
    to: { type: mongoose.Types.ObjectId, ref: 'Account' },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function (value: number) {
                return value > 0;
            },
            message: 'The amount to be transferred must be greater than 0',
        },
    },
    transactionDate: { type: Date, default: Date.now },
    description: { type: String },
    type: { type: String, required: [true, 'The type of transaction is required'], enum: ['deposit', 'withdrawal', 'send'] },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
