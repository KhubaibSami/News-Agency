import "dotenv/config";

const PORT = process.env.PORT;
export const mongodb_connection_string = process.env.MongodbConnectionString;

export default PORT;
