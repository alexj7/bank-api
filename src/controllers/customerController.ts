import { IncomingMessage, ServerResponse } from 'http';

import customerService from '../services/customerService';

import { sendResponse } from '../utils';

const getCustomers = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const customers = await customerService.getCustomers();
        sendResponse(res, 200, customers);
    } catch (error) {
        sendResponse(res, 500, { message: 'Server Error', error });
    }
};

export default {
    getCustomers,
};
