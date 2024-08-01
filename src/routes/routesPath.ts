import { IncomingMessage, ServerResponse } from "http";

import accountController from "../controllers/accountController";
import customerController from "../controllers/customerController";
import transactionController from "../controllers/transactionController";

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
    '/api/customers': {
        GET: customerController.getCustomers,
    },
    '/api/accounts': {
        GET: accountController.getAccounts,
        POST: accountController.createAccount,
    },
    '/api/accounts/balance': {
        GET: accountController.getBalance,
    },
    '/api/transactions': {
        GET: transactionController.getTransactionsByAccountId,
        POST: transactionController.createTransaction,
    }
};