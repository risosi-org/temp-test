"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../src/config"));
const user_model_1 = __importDefault(require("../src/app/modules/users/user.model"));
const encryptionOperation_1 = __importDefault(require("../src/util/encryptionOperation"));
const createAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Construct MongoDB URI
        let mongoUri;
        // Check if mongodb_host is already a full URI
        if (((_a = config_1.default.mongodb_host) === null || _a === void 0 ? void 0 : _a.startsWith("mongodb://")) || ((_b = config_1.default.mongodb_host) === null || _b === void 0 ? void 0 : _b.startsWith("mongodb+srv://"))) {
            mongoUri = config_1.default.mongodb_host;
        }
        else if (config_1.default.mongodb_user && config_1.default.mongodb_password) {
            mongoUri = `mongodb://${config_1.default.mongodb_user}:${config_1.default.mongodb_password}@${config_1.default.mongodb_host}/${config_1.default.mongodb_database}`;
        }
        else {
            mongoUri = `mongodb://${config_1.default.mongodb_host}/${config_1.default.mongodb_database}`;
        }
        // Connect to MongoDB
        console.log("Connecting to MongoDB...");
        yield mongoose_1.default.connect(mongoUri);
        console.log("✓ Connected to MongoDB");
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({
            email: "admin@meta-business.com",
        });
        if (existingUser) {
            console.log("⚠ User with email admin@meta-business.com already exists");
            console.log("Updating password...");
            // Hash the password
            const hashedPassword = yield encryptionOperation_1.default.hashPassword("Admin@12345");
            // Update the user
            existingUser.password = hashedPassword;
            yield existingUser.save();
            console.log("✓ Password updated successfully");
        }
        else {
            // Hash the password
            console.log("Hashing password...");
            const hashedPassword = yield encryptionOperation_1.default.hashPassword("Admin@12345");
            // Create the user
            console.log("Creating admin user...");
            const newUser = yield user_model_1.default.create({
                email: "admin@meta-business.com",
                password: hashedPassword,
            });
            console.log("✓ Admin user created successfully!");
            console.log(`  Email: ${newUser.email}`);
        }
        // Close the connection
        yield mongoose_1.default.connection.close();
        console.log("✓ Database connection closed");
        process.exit(0);
    }
    catch (error) {
        console.error("✗ Error creating admin user:", error);
        if (error instanceof Error) {
            console.error(error.message);
        }
        yield mongoose_1.default.connection.close();
        process.exit(1);
    }
});
// Run the script
createAdminUser();
