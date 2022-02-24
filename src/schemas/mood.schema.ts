import Joi from 'joi'

const storeMoodSchema = Joi.object({
    user_id: Joi.number()
        .integer()
        .min(1)
        .required(),
    
    feeling_id: Joi.number()
        .integer()
        .min(1)
        .required(),

    comment: Joi.string()
        .max(250)
})

const updateMoodSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),
    
    feeling_id: Joi.number()
        .integer()
        .min(1)
        .required(),

    comment: Joi.string()
        .max(250)
})

export { storeMoodSchema, updateMoodSchema }