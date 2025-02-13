import mongoose from "mongoose";

async function connectMongoDB() {
    const uri = `${process.env.URI}BlogDB`;
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

export default connectMongoDB;
