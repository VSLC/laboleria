import { connection } from '../database.js'
import dayjs from 'dayjs'
import joi from 'joi'

const postClient = async (req, res) => {
    const { name, address, phone } = res.locals.body;
    console.log(name, address, phone);

    try {
        await connection.query('INSERT INTO clients (name,address,phone) VALUES ($1,$2,$3)', [name, address, phone]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

const findOrderByClientId = async (req, res) => {
    const { id } = req.params;
    try {
        const findClientById = await connection.query(`SELECT * FROM clients WHERE id=$1`, [id]);
        console.log(findClientById.rows);

        if (findClientById.rowCount === 0) {
            return res.sendStatus(404);
        }

        const findOrdersByClientId = await connection.query(`
        SELECT orders.id,orders.quantity,orders."createdAt",orders."totalPrice",cakes.name  
        FROM orders JOIN clients  ON orders."clientId"=clients.id 
        JOIN cakes ON cakes.id=orders."cakeId" 
        WHERE orders."clientId"=$1
        `, [id])

        const findOrdersByClientIdMap = findOrdersByClientId.rows.map((orders) => ({
            orderId: orders.id,
            quantity: orders.quantity,
            createdAt: dayjs(orders.createdAt).format("YYYY-MM-DD HH:mm"),
            totalPrice: orders.totalPrice,
            cakeName: orders.name
        }))

        return res.status(200).send(findOrdersByClientIdMap)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export { postClient, findOrderByClientId }