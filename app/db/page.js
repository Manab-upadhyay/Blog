import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://manab123:qwerty123@ac-neq9zbn-shard-00-00.hphb4ra.mongodb.net:27017,ac-neq9zbn-shard-00-01.hphb4ra.mongodb.net:27017,ac-neq9zbn-shard-00-02.hphb4ra.mongodb.net:27017/?ssl=true&replicaSet=atlas-eihh8b-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
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