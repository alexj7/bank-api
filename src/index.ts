import { createServer } from 'http';
import dotenv from 'dotenv';

import router from './routes/router';

import { connectDB } from './utils';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize the server and pass router to handle requests
const server = createServer(router);

connectDB(process.env.DB_URL || '');

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
