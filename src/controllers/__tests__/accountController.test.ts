import mongoose from 'mongoose';
import request from 'supertest';
import { createServer } from 'http';

import Customer from '../../models/customer';

import accountService from '../../services/accountService';
import router from '../../routes/router';

jest.mock('../../services/accountService');

describe('Account Controller', () => {
    let server: ReturnType<typeof createServer>;

    const mockCreateAccount = accountService.createAccount as jest.Mock;
    const mockGetAccounts = accountService.getAccounts as jest.Mock;
    const mockGetAccountById = accountService.getAccountById as jest.Mock;
    const mockCalculateBalance = accountService.calculateBalance as jest.Mock;

    beforeAll(async () => {
        server = createServer(router);
    });

    afterAll(async () => {
        server.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new account', async () => {
        const customer = await Customer.create({ name: 'Test Customer' });
        const customerId = customer._id;
        const accountData = { customerId, name: 'Banesco', initial: 100 };

        mockCreateAccount.mockResolvedValue({
            _id: new mongoose.Types.ObjectId(),
            ...accountData,
        });

        const response = await request(server)
            .post('/api/accounts')
            .send(accountData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(accountData.name);
    });

    it('should return 400 if initial deposit is less than or equal to 0', async () => {
        const customer = await Customer.create({ name: 'Test Customer' });
        const customerId = customer._id;
        const accountData = { customerId, name: 'Banesco', initial: 0 };

        const response = await request(server)
            .post('/api/accounts')
            .send(accountData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Initial deposit amount must be greater than 0');
    });

    it('should get all accounts', async () => {
        const customer = await Customer.create({ name: 'Test Customer' });
        const customerId = customer._id;

        const accounts = [
            { _id: new mongoose.Types.ObjectId(), customerId, name: 'Banesco', balance: 100 },
            { _id: new mongoose.Types.ObjectId(), customerId, name: 'Provincial', balance: 200 },
        ];

        mockGetAccounts.mockResolvedValue(accounts);

        const response = await request(server).get('/api/accounts');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    it('should get account balance', async () => {
        const accountId = new mongoose.Types.ObjectId();
        const balance = 150;

        mockGetAccountById.mockResolvedValue({ _id: accountId });
        mockCalculateBalance.mockResolvedValue(balance);

        const response = await request(server).get(`/api/accounts/balance?accountId=${accountId}`);

        expect(response.status).toBe(200);
        expect(response.body.balance).toBe(balance);
    });

    it('should return 400 if account ID is missing in balance request', async () => {
        const response = await request(server).get('/api/accounts/balance');

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Account ID is required');
    });

    it('should return 400 if account ID is invalid', async () => {
        const accountId = new mongoose.Types.ObjectId();

        mockGetAccountById.mockResolvedValue(null);

        const response = await request(server).get(`/api/accounts/balance?accountId=${accountId}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid Account ID');
    });

    it('should return 500 if there is a server error', async () => {
        mockGetAccounts.mockRejectedValue(new Error('Server Error'));

        const response = await request(server).get('/api/accounts');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Server Error');
    });
});
