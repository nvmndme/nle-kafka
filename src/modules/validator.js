const Joi = require('joi');

exports.validateHeader = (groupId) => {
    if (groupId == null) {
        res.status(404).send('Header \"Platform-Id\" was not set.');
        process.exit();
    }
};

exports.validateBody = (body, schema) => {
    
};