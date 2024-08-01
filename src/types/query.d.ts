import 'http';

declare module 'http' {
    interface IncomingMessage {
        query?: {
            [key: string]: string | string[] | undefined;
        };
    }
}
