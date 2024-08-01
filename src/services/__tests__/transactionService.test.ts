import mongoose from 'mongoose';
import transactionService from '../transactionService';
import accountService from '../accountService';

describe('Transaction Service', () => {

    it('should create a new transaction (send)', async () => {

        const fromId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 100, 'Banesco'))._id as mongoose.Types.ObjectId;
        const totId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 50, 'Provincial'))._id as mongoose.Types.ObjectId;;

        const transaction = await transactionService.createTransaction({
            from: fromId,
            to: totId,
            amount: 50,
            type: 'send'
        });

        expect(transaction).toHaveProperty('_id');
        expect(transaction.amount).toBe(50);
        expect(transaction.type).toBe('send');
    });

    it('should create a new transaction (deposit)', async () => {

        const fromId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 100, 'Banesco'))._id as mongoose.Types.ObjectId;
        const transaction = await transactionService.createTransaction({
            from: fromId,
            amount: 40,
            type: 'deposit'
        });

        expect(transaction).toHaveProperty('_id');
        expect(transaction.amount).toBe(40);
        expect(transaction.type).toBe('deposit');
    });

    it('should get all transactions for a given account', async () => {
        const fromId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 100, 'Banesco'))._id as mongoose.Types.ObjectId;
        const totId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 50, 'Provincial'))._id as mongoose.Types.ObjectId;

        await transactionService.createTransaction({
            from: fromId,
            to: totId,
            amount: 50,
            type: 'send'
        });

        await transactionService.createTransaction({
            from: fromId,
            amount: 40,
            type: 'deposit'
        });

        const fromTransactions = await transactionService.getTransactionsByAccountId(fromId);
        const toTransaction = await transactionService.getTransactionsByAccountId(totId);

        expect(fromTransactions).toHaveLength(3);
        expect(toTransaction).toHaveLength(2);
    });

    it('should throw an error for insufficient balance', async () => {

        const fromId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 100, 'Banesco'))._id as mongoose.Types.ObjectId;;
        const totId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 50, 'Provincial'))._id as mongoose.Types.ObjectId;;

        await expect(transactionService.createTransaction({
            from: fromId,
            to: totId,
            amount: 150,
            type: 'send'
        })).rejects.toThrow('Insufficient balance');
    });

    it('should throw an error for non-existent accounts', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const totId = (await accountService.createAccount(new mongoose.Types.ObjectId().toString(), 50, 'Provincial'))._id as mongoose.Types.ObjectId;;

        await expect(transactionService.createTransaction({
            from: randomId,
            to: totId,
            amount: 50,
            type: 'send'

        })).rejects.toThrow('One or both accounts not found');

    });
});
