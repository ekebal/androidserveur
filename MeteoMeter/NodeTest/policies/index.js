const express = require('express');
const router = express.Router();
const authenticated = require('./auth');

module.exports = function () {
    router.use('/user', authenticated);
   // router.use('/home', authenticated);
                                                router.use('/card', authenticated);
                                    router.use('/idea', authenticated);
                                    router.use('/group', authenticated);
                                    router.use('/userprofile', authenticated);
                                    router.use('/choice', authenticated);
                                                        router.use('/ideaanswer', authenticated);
                                    router.use('/reporting', authenticated);
                                    router.use('/photo', authenticated);
                            return router;
};
