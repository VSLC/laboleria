import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connection } from './database.js'
import cakesRouter from './routes/cakesRouter.js'
import clientsRouter from './routes/clientsRouter.js'
import orderRouter from './routes/orderRoute.js'
import dayjs from 'dayjs'

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json())

server.use(cakesRouter);
server.use(clientsRouter);
server.use(orderRouter);


server.listen(process.env.PORT, () => { console.log("Listening on port 4000") })