import mongoose from 'mongoose';
import { IncomingMessage, ServerResponse } from 'http';

import transactionService from '../services/transactionService';

import { sendResponse, getPostData } from '../utils';
import accountService from '../services/accountService';

const createTransaction = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getPostData(req);
        const transaction = await transactionService.createTransaction(body);

        sendResponse(res, 201, transaction);
    } catch (error) {

        if (error instanceof Error) {
            sendResponse(res, 400, { message: error.message });
            return;
        }

        sendResponse(res, 500, { message: 'Server Error', error });
    }
};

const getTransactionsByAccountId = async (req: IncomingMessage, res: ServerResponse) => {
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

        const transactions = await transactionService.getTransactionsByAccountId(accountId);
        sendResponse(res, 200, transactions);
    } catch (error) {
        sendResponse(res, 500, { message: 'Server Error', error });
    }
};


export default {
    getTransactionsByAccountId,
    createTransaction,
};
