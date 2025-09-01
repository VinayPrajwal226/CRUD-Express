import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

console.log("process.env.USER:", process.env.USER);
console.log("process.env.HOST:", process.env.HOST);
const pool =new Pool({
    user:process.env.USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.DBPORT,
});
pool.on("connect",()=>{
    console.log("Connected to the database");   
});
export default pool;