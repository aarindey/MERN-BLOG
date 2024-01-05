// Import the Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectToDB = async () => {
  try {
    // Use Mongoose to connect to the MongoDB server
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });

    // Log a message when the connection is successful
    console.log("Connected to MongoDB");
  } catch (error) {
    // Log an error message if the connection fails
    console.error("MongoDB connection error:", error);
  }
};

// Access the Mongoose connection object for potential further configurations
const connection = mongoose.connection;

// Export the connectToDB function and the connection object for use in other files
module.exports = { connectToDB, connection };
