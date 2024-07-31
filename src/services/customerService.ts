import Customer from '../models/customer';

/**
 * Get all customers
 * 
 * @returns {Promise<Customer[]>} - A list of all customers
 */
const getCustomers = async () => {
    return await Customer.find();
};

export default {
    getCustomers,
};
