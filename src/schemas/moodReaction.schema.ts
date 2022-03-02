import Joi from 'joi'

const storeMoodReactionSchema = Joi.object({
    user_id: Joi.number()
        .integer()
        .min(1)
        .required(),
    
    mood_id: Joi.number()
        .integer()
        .min(1)
        .required(),

    reaction_id: Joi.number()
        .integer()
        .min(1)
        .required(),
})

const updateMoodReactionSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),

    reaction_id: Joi.number()
        .integer()
        .min(1)
        .required(),
})

export { storeMoodReactionSchema, updateMoodReactionSchema }