import { IncomingMessage, ServerResponse } from 'http';

import accountService from '../services/accountService';
import { sendResponse } from '../utils/sendResponse';
import getPostData from '../utils/bodyParser';

const createAccount = async (req: IncomingMessage, res: ServerResponse) => {
    try {

        const body = await getPostData(req);

        const { customerId, initialDeposit } = JSON.parse(body);
        const account = await accountService.createAccount(customerId, initialDeposit);

        sendResponse(res, 201, account);
    } catch (err) {
        sendResponse(res, 400, { message: 'Invalid Request' });
    }
};

// Implement other controller functions (transfer, getBalance, getHistory) here

export default {
    createAccount,
};
