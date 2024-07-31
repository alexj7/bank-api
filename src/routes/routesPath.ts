import { IncomingMessage, ServerResponse } from "http";

import accountController from "../controllers/accountController";
import customerController from "../controllers/customerController";

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

interface RouteDictionary {
    [key: string]: {
        [method: string]: RouteHandler;
    };
}

/**
 * @description Dictionary of routes and their corresponding handlers.
 */
export const routes: RouteDictionary = {
    '/api/accounts': {
        POST: accountController.createAccount,
    },
    '/api/customers': {
        GET: customerController.getCustomers,
    },
};