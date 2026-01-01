import httpStatus from "http-status";
import responseReturn from "./responseReturn";
import ApiError from "../errors/ApiError";
import User from "../app/modules/users/user.model";
import fs from "fs";
import path from "path";
// import unzipper from "unzipper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const unzipper = require("unzipper");
class ServiceModel {
  Response: typeof responseReturn;
  AppError: typeof ApiError;
  HttpStatus: typeof httpStatus;
  User: typeof User;
  constructor() {
    this.Response = responseReturn;
    this.AppError = ApiError;
    this.HttpStatus = httpStatus;
    this.User = User;
  }

  public readonly queryMaker = (query: Record<string, string>) => {
    const { limit, page, sort, search, ...rest } = query;
    const limitQuery = limit ? parseInt(limit) : 10;
    const pageQuery = page ? parseInt(page) : 1;
    const sortQuery: Record<string, 1 | -1> = {};
    const skipQuery = (pageQuery - 1) * limitQuery;
    const searchQuery = search ? search : "";
    const filter: Record<string, string | unknown> = {};

    if (sort) {
      const sortArray = sort.split(",");
      sortArray.forEach((sortOption) => {
        const [key, order] = sortOption.split(":");
        if (key) {
          sortQuery[key] = order === "desc" ? -1 : 1;
        }
      });
    }
    
    // Set default sort if no sort was provided
    if (Object.keys(sortQuery).length === 0) {
      sortQuery.createdAt = -1;
    }
    if (rest) {
      const andConditions: Record<string, unknown>[] = [];

      Object.keys(rest).forEach((key) => {
        const value = rest[key];
        if (rest[key] !== "undefined" && rest[key] !== "null") {
          // Check if the value looks like a range (i.e., contains a hyphen)
          const rangePattern = /^(\d+)-(\d+)$/;
          const match = rest[key].match(rangePattern);

          if (match) {
            // If it's a range, convert it into a MongoDB range query
            const min = parseInt(match[1], 10);
            const max = parseInt(match[2], 10);

            andConditions.push({
              [key]: {
                $gte: min,
                $lte: max,
              },
            });
          } else if (value.includes(":")) {
            andConditions.push({
              $or: value
                .split(":")
                .map((item) => item.trim())
                .filter(
                  (item) => item && item !== "," && item !== ":" && item !== ";"
                )
                .map((item) =>
                  key === "propertyType"
                    ? { [key]: { $regex: item, $options: "i" } }
                    : { [key]: item }
                ),
            });
          } else if (value.includes(";")) {
            andConditions.push({
              $or: value
                .split(";")
                .map((item) => item.trim())
                .filter(
                  (item) => item && item !== "," && item !== ":" && item !== ";"
                )
                .map((item) => ({ [key]: item })),
            });
          } else if (value.includes(",")) {
            andConditions.push({
              $or: value
                .split(",")
                .map((item) => item.trim())
                .filter(
                  (item) => item && item !== "," && item !== ":" && item !== ";"
                )
                .map((item) => ({
                  [key]: { $regex: item, $options: "i" },
                })),
            });
          } else if (key === "createdAt") {
            if (value.includes("_to_")) {
              const [start, end] = value.split("_to_");
              andConditions.push({
                createdAt: {
                  $gte: new Date(start),
                  $lt: new Date(
                    new Date(end).setDate(new Date(end).getDate() + 1)
                  ),
                },
              });
            }
          } else {
            // Convert numeric strings to actual numbers
            if (
              !isNaN(Number(rest[key])) &&
              rest[key] !== null &&
              rest[key] !== ""
            ) {
              filter[key] = Number(rest[key]);
            } else {
              // If it's neither a range, an array, nor a conjunction, assign it directly
              filter[key] = rest[key];
            }
          }
        }
      });

      if (andConditions.length) {
        filter.$and = andConditions;
      }
    }

    return { limitQuery, pageQuery, sortQuery, skipQuery, filter, searchQuery };
  };
  public readonly queryMakerForProperties = (query: Record<string, string>) => {
    const { limit, page, sort, search, ...rest } = query;
    const limitQuery = limit ? parseInt(limit) : 10;
    const pageQuery = page ? parseInt(page) : 1;
    const sortQuery: Record<string, 1 | -1> = {};
    const skipQuery = (pageQuery - 1) * limitQuery;
    const searchQuery = search ? search : "";
    const filter: Record<string, string | unknown> = {};

    if (sort) {
      const sortArray = sort.split(",");
      sortArray.forEach((sortOption) => {
        const [key, order] = sortOption.split(":");
        if (key) {
          sortQuery[key] = order === "desc" ? -1 : 1;
        }
      });
    }
    
    // Set default sort if no sort was provided
    if (Object.keys(sortQuery).length === 0) {
      sortQuery.createdAt = -1;
    }
    if (rest) {
      const andConditions: Record<string, unknown>[] = [];

      Object.keys(rest).forEach((key) => {
        const value = rest[key];
        if (rest[key] !== "undefined" && rest[key] !== "null") {
          // Check if the value looks like a range (i.e., contains a hyphen)
          const rangePattern = /^(\d+)-(\d+)$/;
          const match = rest[key].match(rangePattern);

          if (match) {
            // If it's a range, convert it into a MongoDB range query
            const min = parseInt(match[1], 10);
            const max = parseInt(match[2], 10);

            andConditions.push({
              [key]: {
                $gte: min,
                $lte: max,
              },
            });
          } else if (value.includes(":")) {
            andConditions.push({
              $or: value
                .split(":")
                .map((item) => item.trim())
                .filter(
                  (item) => item && item !== "," && item !== ":" && item !== ";"
                )
                .map((item) =>
                  key === "propertyType"
                    ? { [key]: { $regex: item, $options: "i" } }
                    : { [key]: item }
                ),
            });
          } else if (value.includes(";")) {
            andConditions.push({
              $or: value
                .split(";")
                .map((item) => item.trim())
                .filter(
                  (item) => item && item !== "," && item !== ":" && item !== ";"
                )
                .map((item) => ({ [key]: item })),
            });
          } else if (value.includes(",")) {
            andConditions.push({
              $or: value
                .split(",")
                .map((item) => item.trim())
                .filter(
                  (item) => item && item !== "," && item !== ":" && item !== ";"
                )
                .map((item) => ({
                  [key]: { $regex: item, $options: "i" },
                })),
            });
          } else if (key === "createdAt") {
            if (value.includes("_to_")) {
              const [start, end] = value.split("_to_");
              andConditions.push({
                createdAt: {
                  $gte: new Date(start),
                  $lt: new Date(
                    new Date(end).setDate(new Date(end).getDate() + 1)
                  ),
                },
              });
            }
          } else {
            // Convert numeric strings to actual numbers
            if (
              !isNaN(Number(rest[key])) &&
              rest[key] !== null &&
              rest[key] !== ""
            ) {
              filter[key] = Number(rest[key]);
            } else {
              // If it's neither a range, an array, nor a conjunction, assign it directly
              filter[key] = rest[key];
            }
          }
        }
      });

      if (andConditions.length) {
        filter.$and = andConditions;
      }
    }

    return { limitQuery, pageQuery, sortQuery, skipQuery, filter, searchQuery };
  };
  public getUniqueKey(prefix: string): string {
    const timestamp = new Date().getTime();
    const toStingTimestamp = `${timestamp}`.slice(3, 13);
    const uniqueIdentifier = Math.floor(Math.random() * 1000);

    return `${
      prefix.slice(0, 3).toUpperCase() || "UID"
    }${uniqueIdentifier}${toStingTimestamp}`;
  }

  public slugify(text: string): string {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  public async uploadFile(file: Express.Multer.File, location?: string) {
    const destination = path.join(
      __dirname,
      `../../uploads${location ? "/" + location : "/"}`
    );
    return new Promise((resolve, reject) => {
      const fileName = `${new Date().getTime()}-${file.originalname}`;
      const path = `${destination}/${fileName}`;
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }
      fs.writeFile(path, file.buffer, (err) => {
        if (err) {
          reject(err);
        }
        resolve(fileName);
      });
    });
  }
  public async unzipFile(filePath: string, destination: string) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(unzipper.Extract({ path: destination }))
        .on("finish", () => {
          resolve(true);
        })
        .on("error", (err: unknown) => {
          reject(err);
        });
    });
  }

  test() {
    console.log("test");
  }
}

export default ServiceModel;
