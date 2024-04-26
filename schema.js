const Joi = require('joi');


module.exports.dataSchema = Joi.object({
    data : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        image : Joi.string().allow("",null),
        price : Joi.number().min(0),
        location : Joi.string().required(),
        country : Joi.string().required()
    }).required()
});