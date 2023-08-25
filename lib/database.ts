import mongoose from "mongoose";

export const connectToDB = async () => {
  if (!process.env.MONGODB_URL) {
    console.log("Missing MongoDB URL");
    return;
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      // Check if not already connected
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB connection already established");
    }
  } catch (error) {
    console.log(error);
  }
};
