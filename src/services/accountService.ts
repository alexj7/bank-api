import Account from '../models/account';

/**
 * Create a new account for a customer
 * 
 * @param {string} customerId - The ID of the customer
 * @param {number} initialDeposit - The initial deposit amount
 * 
 * @returns {Promise<Account>} - The newly created account
 */
const createAccount = async (customerId: string, initialDeposit: number) => {
    const account = new Account({ customerId, balance: initialDeposit });
    await account.save();
    return account;
};

// Implement other service functions (transfer, getBalance, getHistory) here

export default {
    createAccount,
};
