'use strict';

const controller = {};
const passport = require('./passport');

controller.show = (req, res) => {

    res.render('login', {loginMessage: req.flash('loginMessage') });
}

controller.login = (req, res) => {
    let keepSignedIn = req.body.keepSignedIn;
    passport.authenticate('local-login', (error, user) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res.redirect('users/login');
        }
        req.logIn(user, (error) => {
            if (error) {return next(error); }
            req.session.cookie.maxAge = keepSignedIn ? (24*60*0*1000) : null;
            return res.redirect('users/my-accout');
        });
    })(req, res, next);

}
module.exports = controller;