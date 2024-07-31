import { IncomingMessage, ServerResponse } from 'http';

import { routes } from './routesPath';

import { sendResponse } from '../utils/sendResponse';

/**
 * @description Handles incoming HTTP requests and routes them to the appropriate handler.
 * 
 */
const router = async (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;

    if (!url || !method) {
        sendResponse(res, 400, { message: 'Bad Request' });
        return;
    }

    const routePath = url.split('?')[0];
    const route = routes[routePath];

    // validate route and method
    if (route && route[method]) {

        // calling the corresponding method to handle the request
        await route[method](req, res);
    } else {
        sendResponse(res, 404, { message: 'Route Not Found' });
    }
};

export default router;
