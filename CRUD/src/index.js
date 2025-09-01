import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import pool from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import errorHandling from './middleware/erroHandler.js';
const app=express();
const port=process.env.port || 3001;
//middlewares
app.use(cors());
app.use(express.json());
//routes
app.use("/api",userRoutes);
//error handling
app.use(errorHandling);
//create user table
import createUserTable from './data/createUserTable.js';
createUserTable();
//testing
app.get('/',async(req,res)=>{
  console.log("start");
  const result=await pool.query("SELECT current_database();");
  res.send(`The database name is: ${result.rows[0].current_database}`);
});
//server listening
app.listen(port,()=>
{
  console.log(`Server is running on port ${port}`);
})
