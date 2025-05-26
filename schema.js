const Joi = require('joi');

const schema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

const reviewSchema = Joi.object({
    review : Joi.object({
        username : Joi.string().required(),
        rating : Joi.number().min(1).max(5).required(),
        comments : Joi.string().required()
    })
})


module.exports = {
    schema,
    reviewSchema
};