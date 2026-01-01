/* eslint-disable no-console */
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables based on the current environment
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
} else if (process.env.NODE_ENV === "development") {
  console.log("Loading local environment variables");
  dotenv.config({ path: path.join(process.cwd(), ".env.local") });
} else {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
}

export default {
  project_name: process.env.PROJECT_NAME || "meta-business-backend",
  port: process.env.PORT || 7000,
  env: process.env.NODE_ENV || "development",
  // mongo database configuration
  mongodb_host: process.env.mongodb_host || "localhost",
  mongodb_database: process.env.mongodb_database || "meta-business",


  // encryption configuration
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire_in: process.env.JWT_EXPIRE_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,

  // admin user configuration
  auth_email: process.env.auth_email,
  auth_password: process.env.auth_password,
};
