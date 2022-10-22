import joi from 'joi'
import { connection } from '../database.js'

const cakeMiddleware = async (req, res, next) => {
    const { name, price, image, description } = req.body;
    const schemaCakes = joi.object({
        name: joi.string().required().min(2),
        price: joi.number().required().positive().min(1),
        description: joi.string().allow("").required()
    })

    const schemaImageCakes = joi.object({
        image: joi.string().uri().required()
    })

    const validation1 = schemaCakes.validate({ name, price, description }, { abortEarly: false });
    if (validation1.error) {
        return res.status(400).send(validation1.error.details.map(error => error.message))
    }

    const validation2 = schemaImageCakes.validate({ image });
    if (validation2.error) {
        return res.status(422).send(validation2.error.details[0].message)
    }

    const queryName = await connection.query('SELECT * FROM cakes WHERE name=$1', [name]);

    if (queryName.rowCount !== 0) {
        return res.status(409).send("Nome do bolo já existe")
    }

    res.locals.body = req.body;
    next();
}

export { cakeMiddleware }