'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

router.use(authController.isLoggedIn);

router.get('/checkout', controller.checkout);
router.post('/placeOrders',
    body('firstName').notEmpty().withMessage('First name is requered!'),
    body('lastName').notEmpty().withMessage('Last name is requered!'),
    body('email').notEmpty().withMessage('Email name is requered!').isEmail().withMessage('Invalid email address!'),
    body('mobile').notEmpty().withMessage('Mobile name is requered!'),
    body('address').notEmpty().withMessage('Address name is requered!'),
    (req, res, next) => {

        let errors = validationResult(req);
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

router.get('/my-account', (req, res) => {
    res.render('my-account');
});

module.exports = router;