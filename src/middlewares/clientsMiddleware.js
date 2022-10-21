import joi from 'joi'

const clientMiddleware = async (req, res, next) => {
    const { name, address, phone } = req.body;
    const clientsSchema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required().min(10).max(11)
    })
    const validation = clientsSchema.validate({ name, address, phone }, { abortEarly: false });
    if (validation.error) {
        return res.status(400).send(validation.error.details.map(error => error.message));
    }
    console.log("passou middleware");
    res.locals.body = req.body
    next()
}

export { clientMiddleware }