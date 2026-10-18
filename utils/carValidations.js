import Joi from "joi";

export const carValidationSchema = Joi.object({
    specs : Joi.object({
        brand : Joi.string()
           .min(2)
           .max(30)
           .required(),

        model : Joi.string()
            .min(1)
            .max(30)
            .required(),

        year : Joi.number()
            .integer()
            .min(1886)
            .max(new Date().getFullYear())
            .required(),

        horsePower : Joi.number()
            .integer()
            .min(10)
            .max(10000)
            .required()
            
    }).required()
});