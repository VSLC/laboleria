import joi from 'joi'
import { connection } from '../database.js'


const postCakes = async (req, res) => {
    const { name, price, image, description } = req.body;
    const schemaCakes = joi.object({
        name: joi.string().required().min(2),
        price: joi.number().required().min(0),
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

    try {
        const queryName = await connection.query('SELECT * FROM cakes WHERE name=$1', [name]);

        if (queryName.rowCount !== 0) {
            return res.status(409).send("Nome do bolo já existe")
        }

        await connection.query('INSERT INTO cakes (name,price,image,description) VALUES ($1,$2,$3,$4)', [name, price, image, description]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export { postCakes }