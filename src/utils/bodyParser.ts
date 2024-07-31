import { IncomingMessage } from 'http';

/**
 * @description Parses the body of an incoming request.
 * 
 * @param req - Incoming request object
 * @returns Promise<string>
 */
const getPostData = (req: IncomingMessage): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (err) {
            reject(err);
        }
    });
};

export default getPostData;