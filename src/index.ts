import { createServer } from 'http';

import dotenv from 'dotenv';

import { connectDB } from './utils';
import router from './routes/router';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
    router(req, res);
});

connectDB(process.env.DB_URL || '');

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
