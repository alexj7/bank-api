import mongoose from 'mongoose';
import accountService from '../accountService';
import transactionService from '../transactionService';
import Customer from '../../models/customer';

const customerId = new mongoose.Types.ObjectId();

describe('Account Service', () => {

    it('should create a new account', async () => {
        const customer = await Customer.create({ name: 'Test Customer' });
        const account = await accountService.createAccount(customer._id as string, 100, 'Banesco');

        expect(account).toHaveProperty('_id');
        expect(account).toHaveProperty('name', 'Banesco');
    });

    it('should get all accounts', async () => {
        const customer = await Customer.create({ name: 'Test Customer' });
        await accountService.createAccount(customer._id as string, 100, 'Banesco');

        const accounts = await accountService.getAccounts();
        expect(accounts).toHaveLength(1);
    });

    it('should get an account by its ID', async () => {
        const account = await accountService.createAccount(customerId.toString(), 100, 'Banesco');

        const foundAccount = await accountService.getAccountById(account._id as string);
        expect(foundAccount?._id).toEqual(account._id);
        expect(foundAccount).toHaveProperty('name', 'Banesco');
    });

    it('should calculate the initial balance correctly', async () => {
        const fromAccount = await accountService.createAccount(customerId.toString(), 100, 'Banesco');
        const fromBalance = await accountService.calculateBalance(fromAccount._id as string);

        expect(fromBalance).toBe(100);
    });

    it('should calculate the balance after send transaction correctly', async () => {
        const fromAccount = await accountService.createAccount(customerId.toString(), 100, 'Banesco');
        const toAccount = await accountService.createAccount(customerId.toString(), 20, 'Provincial');

        await transactionService.createTransaction({
            from: fromAccount._id as mongoose.Types.ObjectId,
            to: toAccount._id as mongoose.Types.ObjectId,
            amount: 30,
            type: 'send'
        });

        const fromBalance = await accountService.calculateBalance(fromAccount._id as string);
        const toBalance = await accountService.calculateBalance(toAccount._id as string);

        expect(fromBalance).toBe(70);
        expect(toBalance).toBe(50);
    });
});
