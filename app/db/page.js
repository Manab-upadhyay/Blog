import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Already connected to the database.');
    return;
  }

  try {
    await mongoose.connect('mongodb://manab123:qwerty123@ac-neq9zbn-shard-00-00.hphb4ra.mongodb.net:27017,ac-neq9zbn-shard-00-01.hphb4ra.mongodb.net:27017,ac-neq9zbn-shard-00-02.hphb4ra.mongodb.net:27017/?ssl=true&replicaSet=atlas-eihh8b-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
