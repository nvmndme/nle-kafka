const Joi = require('joi');

exports.validateHeader = (header) => {
    const schema = Joi.object({
        a: Joi.string();
    })
}

exports.validateBody = (body) => {

}