import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

let testServer: MongoMemoryReplSet;

// Increase the timeout delay for wait for the memory database to start
jest.setTimeout(8000);

// Configure the memory database before all tests
beforeAll(async () => {
    testServer = await MongoMemoryReplSet.create({
        replSet: { count: 1 },
    });
    const uri = testServer.getUri();
    await mongoose.connect(uri);
});

// Clean the database before each test
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// Close the connection and stop the memory database after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await testServer.stop();
});
