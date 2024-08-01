import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

import { routes } from './routesPath';

import { sendResponse } from '../utils';

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

    const parsedUrl = parse(url, true);

    const routePath = url.split('?')[0];
    const route = routes[routePath];

    // validate route and method
    if (route && route[method]) {
        req['query'] = parsedUrl.query; // Add query params to req object
        await route[method](req, res);  // calling the corresponding method to handle the request
    } else {
        sendResponse(res, 404, { message: 'Route Not Found' });
    }
};

export default router;
