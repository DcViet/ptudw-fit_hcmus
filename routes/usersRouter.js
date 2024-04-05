'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const { body, resultValidation } = require('express-validator');

router.get('/checkout', controller.checkout);
router.post('/placeorders',
    body('firstName').notEmpty().withMessage('First name is requered!'),
    body('firstName').notEmpty().withMessage('Last name is requered!'),
    body('firstName').notEmpty().withMessage('Email name is requered!').isEmail().withMessage('Invalid email address!'),
    body('firstName').notEmpty().withMessage('Mobile name is requered!'),
    body('firstName').notEmpty().withMessage('Address name is requered!'),
    (req, res, next) => {

        let errors = resultValidation(req);
        if (req.body.addressId == "0" && !errors.isEmpty()) {
            let errorArray = errors.array();
            let message = '';
            for (let i = 0; i < errorArray.length; i++) {
                message += errorArray[i].msg + "<br/>"
            }
            return res.render('error', { message });
        }
        next();
    },
    controller.placeorders
);

module.exports = router;