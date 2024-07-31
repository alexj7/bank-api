import { ServerResponse } from 'http';

/**
 * @description Sends the response to the client.
 * 
 * @param res - ServerResponse object
 * @param statusCode - HTTP status code
 * @param data - JSON data to be sent
 */
export const sendResponse = (res: ServerResponse, statusCode: number, data: object) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};