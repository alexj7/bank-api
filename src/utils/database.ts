import mongoose from 'mongoose';

/**
 * @description Connects to MongoDB using the provided connection string.
 * 
 * @param db - MongoDB connection string
 */
export const connectDB = async (db: string) => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected...');
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('An unknown error occurred during MongoDB connection');
        }
        process.exit(1);
    }
};