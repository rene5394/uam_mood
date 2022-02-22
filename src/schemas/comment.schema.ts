import Joi from 'joi'

const storeCommentSchema = Joi.object({
    user_id: Joi.number()
        .integer()
        .min(1)
        .required(),
    
    mood_id: Joi.number()
        .integer()
        .min(1)
        .required(),

    comment: Joi.string()
        .max(150)
        .required()
})

const updateCommentSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),

    comment: Joi.string()
        .max(150)
        .required()
})

export { storeCommentSchema, updateCommentSchema }