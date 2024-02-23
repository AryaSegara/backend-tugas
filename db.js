import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

export const connection =await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
});


