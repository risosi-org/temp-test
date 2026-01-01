import mongoose from "mongoose";
import config from "../src/config";
import User from "../src/app/modules/users/user.model";
import encryptionOperation from "../src/util/encryptionOperation";

const createAdminUser = async () => {
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

    // Check if user already exists
    const existingUser = await User.findOne({
      email: "admin@meta-business.com",
    });

    if (existingUser) {
      console.log("⚠ User with email admin@meta-business.com already exists");
      console.log("Updating password...");
      
      // Hash the password
      const hashedPassword = await encryptionOperation.hashPassword(
        "Admin@12345"
      );
      
      // Update the user
      existingUser.password = hashedPassword;
      await existingUser.save();
      
      console.log("✓ Password updated successfully");
    } else {
      // Hash the password
      console.log("Hashing password...");
      const hashedPassword = await encryptionOperation.hashPassword(
        "Admin@12345"
      );

      // Create the user
      console.log("Creating admin user...");
      const newUser = await User.create({
        email: "admin@meta-business.com",
        password: hashedPassword,
      });

      console.log("✓ Admin user created successfully!");
      console.log(`  Email: ${newUser.email}`);
    }

    // Close the connection
    await mongoose.connection.close();
    console.log("✓ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("✗ Error creating admin user:", error);
    if (error instanceof Error) {
      console.error(error.message);
    }
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createAdminUser();

