import { connection } from '../database.js'
import dayjs from 'dayjs'

const postOrder = async (req, res) => {
    const { clientId, cakeId, quantity } = res.locals.body;
    console.log(clientId, cakeId, quantity, "res.locals.body")


    try {

        const findClientById = await connection.query('SELECT * FROM clients WHERE id=$1', [clientId]);
        const findCakeById = await connection.query('SELECT * FROM cakes WHERE id=$1', [cakeId]);


        if (findClientById.rowCount === 0) {
            return res.status(404).send("Usuário não encontrado.");
        }

        if (findCakeById.rowCount === 0) {
            return res.status(404).send("Bolo não encontrado.");
        }

        let totalPrice = findCakeById.rows[0].price * quantity;
        const createdAt = dayjs().format("YYYY-MM-DD HH:mm");

        const insertOrder = await connection.query(`INSERT INTO orders ("clientId","cakeId",quantity,"totalPrice","createdAt") 
        VALUES ($1,$2,$3,$4,$5)`, [clientId, cakeId, quantity, totalPrice, createdAt]);
        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const getOrder = async (req, res) => {
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
            orders."totalPrice" AS "totalPrice"
        FROM orders
        JOIN clients ON orders."clientId"=clients.id
        JOIN cakes ON orders."cakeId"=cakes.id
        WHERE orders."createdAt"::date=$1
        `, [`${date}`]
            )

            if (getOrdersByDate.rowCount === 0) {
                return res.status(404).send([])
            };

            const ordersMap = getOrdersByDate.rows.map((orders) => ({
                client: {
                    id: orders.clientId,
                    name: orders.clientName,
                    address: orders.address,
                    phone: orders.phone
                },
                cake: {
                    id: orders.cakeId,
                    name: orders.cakeName,
                    price: orders.price,
                    description: orders.description,
                    image: orders.image
                },
                orderId: orders.orderId,
                createdAt: dayjs(orders.createdAt).format("YYYY-MM-DD HH:mm"),
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
            return res.status(404).send([])
        };

        const ordersMap = getOrders.rows.map((orders) => ({
            client: {
                id: orders.clientId,
                name: orders.clientName,
                address: orders.address,
                phone: orders.phone
            },
            cake: {
                id: orders.cakeId,
                name: orders.cakeName,
                price: orders.price,
                description: orders.description,
                image: orders.image
            },
            orderId: orders.orderId,
            createdAt: dayjs(orders.createdAt).format("YYYY-MM-DD HH:mm"),
            quantity: orders.quantity,
            totalPrice: orders.totalPrice
        }))
        return res.status(200).send(ordersMap);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {

        if (id) {
            const verifyId = await connection.query(`
            SELECT * FROM orders WHERE id=$1
        `, [id]);

            if (verifyId.rowCount === 0) {
                return res.sendStatus(404);
            }

            const getOrderById = await connection.query(`
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
            WHERE orders.id=$1
            `, [id]);

            const ordersMap = getOrderById.rows.map((orders) => ({
                client: {
                    id: orders.clientId,
                    name: orders.clientName,
                    address: orders.address,
                    phone: orders.phone
                },
                cake: {
                    id: orders.cakeId,
                    name: orders.cakeName,
                    price: orders.price,
                    description: orders.description,
                    image: orders.image
                },
                orderId: orders.orderId,
                createdAt: dayjs(orders.createdAt).format("YYYY-MM-DD HH:mm"),
                quantity: orders.quantity,
                totalPrice: orders.totalPrice
            }))

            return res.status(200).send(ordersMap);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}


export { postOrder, getOrder, getOrderById }