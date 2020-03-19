const Joi = require('joi');
const express = require('express');

exports.validateHeader = (res, groupId) => {
    if (groupId == null) {
        res.status(404).send('Header \"Platform-Id\" was not set.');
    }
};

exports.validateBody = (body, schema) => {
    
};