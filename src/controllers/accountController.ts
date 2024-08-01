import { IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';

import accountService from '../services/accountService';

import { sendResponse, getPostData } from '../utils';

const createAccount = async (req: IncomingMessage, res: ServerResponse) => {
    try {

        const body = await getPostData(req);
        const { customerId, name, initial } = body;

        if(initial <= 0) {
            sendResponse(res, 400, { message: 'Initial deposit amount must be greater than 0' });
            return;
        }

        const account = await accountService.createAccount(customerId, initial, name);

        sendResponse(res, 201, account);
    } catch (error) {
        if (error instanceof Error) {
            sendResponse(res, 400, { message: error.message });
            return;
        }
        
        sendResponse(res, 400, { message: 'Invalid Request', error });
    }
};

const getAccounts = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const accounts = await accountService.getAccounts();
        sendResponse(res, 200, accounts);
    } catch (error) {
        sendResponse(res, 500, { message: 'Server Error', error });
    }
}

const getBalance = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const accountId = req.query?.accountId as string;

        if (!accountId) {
            sendResponse(res, 400, { message: 'Account ID is required' });
            return;
        }

        const isExist = await accountService.getAccountById(accountId);

        if (!isExist) {
            sendResponse(res, 400, { message: 'Invalid Account ID' });
            return;
        }

        const balance = await accountService.calculateBalance(accountId);

        sendResponse(res, 200, { balance });
    } catch (error) {
        sendResponse(res, 500, { message: 'Server Error', error });
    }
};

export default {
    createAccount,
    getAccounts,
    getBalance,
};
