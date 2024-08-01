import mongoose from 'mongoose';
import request from 'supertest';
import { createServer } from 'http';

import transactionService from '../../services/transactionService';
import accountService from '../../services/accountService';

import router from '../../routes/router';

jest.mock('../../services/transactionService');

jest.mock('../../services/accountService');

describe('Transaction Controller', () => {
    let server: ReturnType<typeof createServer>;

    const mockGetAccountById = accountService.getAccountById as jest.Mock;
    const mockCreateTransaction = transactionService.createTransaction as jest.Mock;
    const mockGetTransactionsByAccountId = transactionService.getTransactionsByAccountId as jest.Mock;

    beforeAll(async () => {
        server = createServer(router);
    });

    afterAll(async () => {
        server.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new transaction', async () => {
        const transactionData = {
            from: new mongoose.Types.ObjectId(),
            to: new mongoose.Types.ObjectId(),
            amount: 100,
            type: 'send'
        };

        mockCreateTransaction.mockResolvedValue({
            _id: new mongoose.Types.ObjectId(),
            ...transactionData,
            transactionDate: new Date()
        });

        const response = await request(server)
            .post('/api/transactions')
            .send(transactionData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.amount).toBe(transactionData.amount);
        expect(response.body.type).toBe(transactionData.type);
    });

    it('should return 400 if create transaction fails', async () => {
        const transactionData = {
            from: new mongoose.Types.ObjectId(),
            to: new mongoose.Types.ObjectId(),
            amount: 100,
            type: 'send'
        };

        jest.mocked(transactionService.createTransaction).mockRejectedValue(new Error('Invalid Transaction'));

        const response = await request(server)
            .post('/api/transactions')
            .send(transactionData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid Transaction');
    });

    it('should get transactions by account ID', async () => {
        const accountId = new mongoose.Types.ObjectId().toString();
        const transactions = [
            { _id: new mongoose.Types.ObjectId(), from: accountId, to: new mongoose.Types.ObjectId(), amount: 100, type: 'send', transactionDate: new Date() },
            { _id: new mongoose.Types.ObjectId(), from: new mongoose.Types.ObjectId(), to: accountId, amount: 50, type: 'send', transactionDate: new Date() },
        ];

        mockGetAccountById.mockResolvedValue({ _id: accountId });
        mockGetTransactionsByAccountId.mockResolvedValue(transactions);

        const response = await request(server).get(`/api/transactions?accountId=${accountId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].amount).toBe(100);
        expect(response.body[1].amount).toBe(50);
    });

    it('should return 400 if account ID is missing in get transactions request', async () => {
        const response = await request(server).get('/api/transactions');

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Account ID is required');
    });

    it('should return 400 if account ID is invalid', async () => {
        const accountId = new mongoose.Types.ObjectId().toString();

        mockGetAccountById.mockResolvedValue(null);

        const response = await request(server).get(`/api/transactions?accountId=${accountId}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid Account ID');
    });

});
