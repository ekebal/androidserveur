const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const ControllerBase = require('./ControllerBase');
const passport = require('passport');
const MailSender = require('../services/mailService.js');

const User = global.Models.user;

module.exports = class AccountController extends ControllerBase {

    register(req, res) {
        res.render('./account/register', { layout: 'unAutherizedLayout' });
    }

    login(req, res) {
        res.render('./account/login', { layout: 'unAutherizedLayout' });
    }

    changePassword(req, res) {
        res.render('./account/changePassword', req.user);
    }

    forgotPassword(req, res) {
        res.render('./account/forgotPassword', { layout: 'unAutherizedLayout' });
    }

    async saveRegister(req, res) {
        try {
            let entity = await User.findOne({ username: req.body.username });

            if (entity) {
                res.render('./errors/error', { message: `User already exists: ${username}` });
            } else {
                req.body.creationDate = (new Date()).toISOString();

                await User.create(req.body);

                MailSender.sendNewUserEmail(req.body.firstName + ' ' + req.body.lastName, req.body.username,
                    (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            req.login(req.body,
                                () => {
                                    res.redirect('/home/index');
                                });
                        }
                    });
            }
        } catch (err) {
            res.render('./errors/error', err);
        }
    }

    async updatePassword(req, res) {
        let id = req.params.id;

        try {
            let user = await User.findOne({ _id: id });

            if (!user) {
                res.render('./errors/error', { message: `User not found with id: ${id}` });
            } else {
                if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {

                    res.render('./errors/error', { message: 'Old password does not match with current password.' });
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) throw err;
                        bcrypt.hash(req.body.newPassword, salt, async function (err, hash) {
                            if (err) throw err;

                            await User.update({ _id: id }, { password: hash });

                            res.render('./account/passwordChanged');
                        });
                    });
                }
            }
        } catch (err) {
            res.render('./errors/error', err);
        }
    }

    async sendNewPassword(req, res) {
        let email = req.body.email;
        try {
            let user = await User.findOne({ username: email });

            if (!user) {
                res.render('./account/login', { success: false, message: "User does not exists with email id:  ${email}" });
            } else {
                let randomPassword = Math.random().toString(36).slice(-8);

                bcrypt.genSalt(10, function (err, salt) {
                    if (err) return next(err);

                    bcrypt.hash(randomPassword, salt, async function (err, hash) {
                        if (err) return next(err);

                        let updatedEntity = await User.update({ _id: user._id }, { password: hash }).fetch();

                        res.render('./account/newPasswordSent', { layout: 'unAutherizedLayout' });

                        MailSender.sendForgotPasswordEmail(user.firstName + " " + user.lastName, email, randomPassword,
                            (err) => {
                                if (err) {
                                    console.log(err);
                                    res.render('./errors/error', err);
                                } else {
                                    // res.render('./account/newPasswordSent', { layout: 'unAutherizedLayout' });
                                }
                            });
                    });
                });
            }
        } catch (err) {
            res.render('./errors/error', err);
        }
    }

    async doLogin(req, res) {
        try {
            let user = await User.findOne({ userName: req.body.username });
            if (!user) {
                req.session.user = undefined;
                res.render('./account/login', { success: false, message: "Invalid username or password" });
            } else {
                req.session.user = user;
                res.redirect('/home/index');
            }
        } catch (err) {
            res.render('./errors/error', err);
        }
    }

    doLogout(req, res) {
        req.logout();
        res.redirect('/account/login');
    }
}

