import "dotenv/config";

const PORT = process.env.PORT;
export const mongodb_connection_string = process.env.MongodbConnectionString;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export default PORT;
