import config from "../config";
import User from "../app/modules/users/user.model";
import encryptionOperation from "../util/encryptionOperation";
import logger from "./logger";

/**
 * Initialize admin user on server startup
 * - Checks if any user exists in the database
 * - If any user exists, skips creation
 * - If no user exists, creates new admin user with auth credentials
 */
const initializeAdminUser = async (): Promise<void> => {
  try {
    const { auth_email, auth_password } = config;

    if (!auth_email || !auth_password) {
      logger.warn(
        "⚠ auth_email or auth_password not configured in environment variables. Skipping admin user initialization."
      );
      return;
    }

    // TypeScript type narrowing - we know these are strings after the check
    const email = auth_email as string;
    const password = auth_password as string;

    // Check if any user exists in the database
    const existingUser = await User.findOne({});

    if (existingUser) {
      logger.info(`✓ User already exists in database. Skipping user creation.`);
      return;
    }

    // No user exists, create new admin user
    logger.info(`⚠ No user found. Creating new admin user...`);

    const hashedPassword = await encryptionOperation.hashPassword(password);

    await User.create({
      email,
      password: hashedPassword,
    });

    logger.info(`✓ Admin user (${email}) created successfully`);
  } catch (error) {
    logger.error("✗ Error initializing admin user:");
    if (error instanceof Error) {
      logger.error(error.message);
    }
    // Don't throw error to prevent server startup failure
  }
};

export default initializeAdminUser;
