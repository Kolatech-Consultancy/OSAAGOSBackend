import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.MONGO_URL;
export const connectDB = async function () {
  try {
    const { connection: db } = await mongoose.connect(
      url,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    return db;
  } catch (error) {
    console.log(`Error:${error.message}`.red);
    process.exit;
  }
};
