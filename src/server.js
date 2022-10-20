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

server.get('/orders', async (req, res) => {
    const { date } = req.query
    try {

        if (date) {
            const getOrdersByDate = await connection.query(`
        SELECT 
            clients.id AS "clientId",
            clients.name AS "clientName",
            clients.address AS "address",
            clients.phone AS "phone",
            cakes.id AS "cakeId",
            cakes.name AS "cakeName",
            cakes.price AS "price",
            cakes.description AS "description",
            cakes.image AS "image",
            orders.id AS "orderId",
            orders."createdAt" AS "createdAt",
            orders.quantity AS "quantity",
            orders."totalPrice" AS "totalPrice",
        FROM orders
        JOIN clients ON orders."clientId"=clients.id
        JOIN cakes ON orders."cakeId"=cakes.id
        WHERE orders."createdAt"::date=$1
        `, [`${date}`]
            )

            if (getOrdersByDate.rowCount === 0) {
                return res.status(404).send("Nenhum pedido encontrado")
            };

            const ordersMap = getOrdersByDate.rows.map((orders) => ({
                client: {
                    id: orders.clientId,
                    name: orders.clientName,
                    address: orders.address,
                    phone: orderRouter.phone
                },
                cake: {
                    id: orders.cakeId,
                    name: orders.cakeName,
                    price: orders.price,
                    description: orders.description,
                    image: orders.image
                },
                orderId: orders.orderId,
                createdAt: orders.dayjs(createdAt).format("YYYY-MM-DD HH:mm"),
                quantity: orders.quantity,
                totalPrice: orders.totalPrice
            }))

            return res.status(200).send(ordersMap)

        }

        const getOrders = await connection.query(`
        SELECT 
            clients.id AS "clientId",
            clients.name AS "clientName",
            clients.address AS "address",
            clients.phone AS "phone",
            cakes.id AS "cakeId",
            cakes.name AS "cakeName",
            cakes.price AS "price",
            cakes.description AS "description",
            cakes.image AS "image",
            orders.id AS "orderId",
            orders."createdAt" AS "createdAt",
            orders.quantity AS "quantity",
            orders."totalPrice" AS "totalPrice"
        FROM orders
        JOIN clients ON orders."clientId"=clients.id
        JOIN cakes ON orders."cakeId"=cakes.id
        `
        )

        if (getOrders.rowCount === 0) {
            return res.status(404).send("Nenhum pedido encontrado")
        };

        const ordersMap = getOrders.rows.map((orders) => ({
            client: {
                id: orders.clientId,
                name: orders.clientName,
                address: orders.address,
                phone: orderRouter.phone
            },
            cake: {
                id: orders.cakeId,
                name: orders.cakeName,
                price: orders.price,
                description: orders.description,
                image: orders.image
            },
            orderId: orders.orderId,
            createdAt: createdAt.format("YYYY-MM-DD HH:mm"),
            quantity: orders.quantity,
            totalPrice: orders.totalPrice
        }))
        return res.status(200).send(ordersMap);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})


server.listen(process.env.PORT, () => { console.log("Listening on port 4000") })