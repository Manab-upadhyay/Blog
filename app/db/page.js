import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0/myblogs', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


export default connectDB;