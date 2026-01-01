import app from "./app";
import config from "./config";
import database from "./config/database";
import logger from "./helpers/logger";
import initializeAdminUser from "./helpers/initializeAdminUser";
import colors from "colors";

colors.enable();

process.on("uncaughtException", (error: Error) => {
  logger.error(`uncaught exception: ${error.message}`.red.bold);
  process.exit(1);
});

const startServer = async () => {
  try {
    // database connnection initialization
    const con = new database();
    await con.mongoConnect(config.mongodb_host, config.mongodb_database);

    // Initialize admin user after database connection
    await initializeAdminUser();

    app.listen(config.port, () => {
      logger.info(`server is running on port ${config.port}`.blue.bold);
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message.red.bold);
    }
  }
};

process.on("unhandledRejection", (error: Error) => {
  logger.error(`unhandled rejection: ${error.message}`.red.bold);
  process.exit(1);
});
startServer();
