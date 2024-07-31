import { IncomingMessage, ServerResponse } from 'http';

import customerService from '../services/customerService';

import { sendResponse } from '../utils/sendResponse';

const getCustomers = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const customers = await customerService.getCustomers();
        sendResponse(res, 200, customers);
    } catch (err) {
        sendResponse(res, 500, { message: 'Server Error' });
    }
};


export default {
    getCustomers,
};
