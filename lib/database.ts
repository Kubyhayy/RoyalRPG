import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (!isConnected) {
    if (!process.env.MONGODB_URL) {
      console.log("Missing MongoDB URL");
      return;
    }

    try {
      if (mongoose.connection.readyState !== 1) {
        // Check if not already connected
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("MongoDB connected3");
      } else {
        console.log("MongoDB connection already established333");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("MongoDB connection already established444");
  }
};
