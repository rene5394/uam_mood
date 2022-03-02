import Joi from 'joi'

const storeCommentReactionSchema = Joi.object({
    user_id: Joi.number()
        .integer()
        .min(1)
        .required(),
    
    comment_id: Joi.number()
        .integer()
        .min(1)
        .required(),

    reaction_id: Joi.number()
        .integer()
        .min(1)
        .required(),
})

const updateCommentReactionSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),

    reaction_id: Joi.number()
        .integer()
        .min(1)
        .required(),
})

export { storeCommentReactionSchema, updateCommentReactionSchema }