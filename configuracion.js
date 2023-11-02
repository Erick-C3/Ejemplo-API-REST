import { config } from "dotenv";

config();

const PORT = process.env.DB_PORT;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;
const HOST = process.env.DB_HOST;

export default {
    PORT,
    USER,
    PASSWORD,
    NAME,
    HOST
}