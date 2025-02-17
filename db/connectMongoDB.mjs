import mongoose from "mongoose";

async function connectMongoDB() {
    // const uri = `${process.env.URI}BlogDB`; 
    const URI = process.env.MONGO_URL;
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

export default connectMongoDB;
