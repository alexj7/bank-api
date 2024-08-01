import mongoose from 'mongoose';
import request from 'supertest';
import { createServer } from 'http';

import customerService from '../../services/customerService';

import router from '../../routes/router';

jest.mock('../../services/customerService');

describe('Customer Controller', () => {
    let server: ReturnType<typeof createServer>;

    const mockGetCustomers = customerService.getCustomers as jest.Mock;

    beforeAll(async () => {
        server = createServer(router);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        server.close();
    });


    it('should return an empty list if no customers exist', async () => {
        mockGetCustomers.mockResolvedValue([]);

        const response = await request(server).get('/api/customers');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    it('should get all customers', async () => {
        const customers = [
            { _id: new mongoose.Types.ObjectId(), name: 'Customer 1' },
            { _id: new mongoose.Types.ObjectId(), name: 'Customer 2' },
        ];

        mockGetCustomers.mockResolvedValue(customers);

        const response = await request(server).get('/api/customers');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toBe('Customer 1');
        expect(response.body[1].name).toBe('Customer 2');
    });

});
