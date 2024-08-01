import mongoose from 'mongoose';
import Transaction, { ITransaction } from '../models/transaction';
import Account from '../models/account';
import accountService from './accountService';

/**
 * @description Create a new transaction (deposit, withdrawal, or transfer)
 *  The transaction is created within a session to ensure data consistency
 *  If the transaction is a transfer or withdrawal, the balance of the sender account is checked
 * 
 * @param transactionData 
 * @returns { Promise<ITransaction> } - The newly created transaction
 */
const createTransaction = async (transactionData: Partial<ITransaction>): Promise<ITransaction> => {
    const { from, to, amount, type } = transactionData;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const fromAccount = await Account.findById(from).session(session);
        const toAccount = await Account.findById(to).session(session);

        if (!fromAccount || (type === 'send' && !toAccount)) {
            throw new Error('One or both accounts not found');
        }

        if (type === 'send' || type === 'withdrawal') {
            const balance = await accountService.calculateBalance(fromAccount._id as string);
            if (balance < amount!) {
                throw new Error('Insufficient balance');
            }
        }

        const transaction = new Transaction(transactionData);
        await transaction.save({ session });

        await session.commitTransaction();
        session.endSession();

        return transaction;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


/**
 * @description Get all transactions for a given account
 * 
 * @param accountId 
 * @returns { Promise<ITransaction[]> } - The transactions for the account
 */
const getTransactionsByAccountId = async (accountId: mongoose.Types.ObjectId | string): Promise<ITransaction[]> => {
    return await Transaction.find({
        $or: [{ from: accountId }, { to: accountId }],
    }).populate('from to', 'name').sort({ transactionDate: -1 });
};


export default {
    createTransaction,
    getTransactionsByAccountId,
};
