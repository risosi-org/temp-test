import mongoose from "mongoose";
import config from "../src/config";
import { Audience } from "../src/app/modules/audience/audience.model";

const createAudience = async () => {
  try {
    // Construct MongoDB URI
    let mongoUri: string;
    
    // Check if mongodb_host is already a full URI
    if (config.mongodb_host?.startsWith("mongodb://") || config.mongodb_host?.startsWith("mongodb+srv://")) {
      mongoUri = config.mongodb_host;
    } else if (config.mongodb_user && config.mongodb_password) {
      mongoUri = `mongodb://${config.mongodb_user}:${config.mongodb_password}@${config.mongodb_host}/${config.mongodb_database}`;
    } else {
      mongoUri = `mongodb://${config.mongodb_host}/${config.mongodb_database}`;
    }

    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");

    const audienceData = {
      userid: "733716493153811",
      name: "Money Off Your Bills",
      isAdmin: true,
      isMessageEnabled: true,
      isCommentEnabled: true,
    };

    // Check if audience already exists
    const existingAudience = await Audience.findOne({
      userid: audienceData.userid,
    });

    if (existingAudience) {
      console.log(`⚠ Audience with userid ${audienceData.userid} already exists`);
      console.log("Updating audience...");
      
      // Update the audience
      existingAudience.name = audienceData.name;
      existingAudience.isAdmin = audienceData.isAdmin;
      existingAudience.isMessageEnabled = audienceData.isMessageEnabled;
      existingAudience.isCommentEnabled = audienceData.isCommentEnabled;
      await existingAudience.save();
      
      console.log("✓ Audience updated successfully");
      console.log(`  UserID: ${existingAudience.userid}`);
      console.log(`  Name: ${existingAudience.name}`);
      console.log(`  isAdmin: ${existingAudience.isAdmin}`);
    } else {
      // Create the audience
      console.log("Creating audience...");
      const newAudience = await Audience.create(audienceData);

      console.log("✓ Audience created successfully!");
      console.log(`  UserID: ${newAudience.userid}`);
      console.log(`  Name: ${newAudience.name}`);
      console.log(`  isAdmin: ${newAudience.isAdmin}`);
    }

    // Close the connection
    await mongoose.connection.close();
    console.log("✓ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("✗ Error creating audience:", error);
    if (error instanceof Error) {
      console.error(error.message);
    }
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createAudience();


