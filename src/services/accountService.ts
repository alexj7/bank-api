import mongoose from 'mongoose';
import Account from '../models/account';

import transactionService from './transactionService';

/**
 * @description Create a new account for a customer
 * 
 * @param {string} customerId - The ID of the customer
 * @param {string} name - The name of the account
 * @param {number} initial - The initial deposit amount
 * 
 * @returns {Promise<Account>} - The newly created account
 */
const createAccount = async (customerId: string, initial: number, name: string) => {
    const account = new Account({ name, customerId, balance: initial });
    await account.save();

    if (Number(initial) > 0) {
        await transactionService.createTransaction({
            from: account._id as mongoose.Types.ObjectId,
            amount: initial,
            type: 'deposit',
            description: 'Initial deposit',
        });
    }

    return account;
};

/**
 * @description Get an account by its ID
 * 
 * @param {string} accountId - The ID of the account
 * 
 * @returns {Promise<Account>} - The account
 */
const getAccountById = async (accountId: string) => {
    return await Account.findById(accountId);
}

/**
 * @description Get all accounts
 * 
 * @returns {Promise<Account[]>} - The list of accounts
 */
const getAccounts = async () => {
    return await Account.find().populate('customerId');
};

/**
 * @description Calculate the balance of an account based on its transactions
 */
const calculateBalance = async (accountId: string): Promise<number> => {
    // Gets all transactions related to the account (both origin and destination)
    const transactions = await transactionService.getTransactionsByAccountId(new mongoose.Types.ObjectId(accountId));

    return transactions.reduce((balance, transaction) => {
        if (transaction.type === 'deposit') {
            // Add the transaction amount if it is a deposit
            return balance + transaction.amount;
        } else if (transaction.type === 'withdrawal') {
            // Subtract the transaction amount if it is a withdrawal
            return balance - transaction.amount;
        } else if (transaction.type === 'send') {
            if (transaction.from._id.equals(accountId)) {
                // Subtracts the transaction amount if the account is the originating account on a transfer
                return balance - transaction.amount;
            } else if (transaction.to!._id.equals(accountId)) {
                // Adds the transaction amount if the account is the destination account in a transfer
                return balance + transaction.amount;
            }
        }
        return balance;
    }, 0);
};



export default {
    calculateBalance,
    getAccountById,
    createAccount,
    getAccounts,
};
