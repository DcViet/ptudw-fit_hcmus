'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authController'); 
// const { authenticate } = require('passport');
// const { route } = require('./indexRouter');

router.get('/login', controllers.show);
router.post('/login', controllers.login);

module.exports = router;