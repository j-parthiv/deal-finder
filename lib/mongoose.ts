import mongoose from 'mongoose';

let isConnected = false; //Variable to track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

    if(isConnected) return console.log('Already connected to the database');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;

        console.log('Connected to the database');

    } catch (error: any) {
        console.log(error)
    }

};

