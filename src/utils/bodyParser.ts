import { IncomingMessage } from 'http';
import { parse } from 'querystring';

/**
 * Parses the body of a request and returns it as a JSON object.
 * 
 * @param {IncomingMessage} req - The incoming request object.
 * @returns {Promise<any>} - The parsed body as a JSON object.
 */
export const getPostData = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                        const parsedBody = parse(body);
                        resolve(parsedBody);
                    } else {
                        const parsedBody = JSON.parse(body);
                        resolve(parsedBody);
                    }
                } catch (error) {
                    reject(new Error('Invalid JSON'));
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};
