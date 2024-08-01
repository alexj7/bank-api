import mongoose from 'mongoose';
import customerService from '../customerService';
import Customer from '../../models/customer';

describe('Customer Service', () => {

    it('should return an empty list if no customers exist', async () => {
        const customers = await customerService.getCustomers();

        expect(customers).toHaveLength(0);
    });

    it('should get all customers', async () => {

        const customer1 = await Customer.create({ name: 'Customer One' });
        const customer2 = await Customer.create({ name: 'Customer Two' });

        const customers = await customerService.getCustomers();

        expect(customers).toHaveLength(2);
        expect(customers[0].name).toBe(customer1.name);
        expect(customers[1].name).toBe(customer2.name);
    });

});
