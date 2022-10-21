import joi from 'joi'

const orderMiddleware = async (req, res, next) => {
    const { clientId, cakeId, quantity } = req.body;

    const orderSchema = joi.object({
        clientId: joi.number().integer().required(),
        cakeId: joi.number().integer().required(),
        quantity: joi.number().integer().min(1).max(4).required(),
    })

    const validation = orderSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        return res.status(400).send(validation.error.details.map(error => error.message))
    }

    res.locals.body = req.body;

    next()
}

export { orderMiddleware }