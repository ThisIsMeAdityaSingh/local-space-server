const societyRouter = require('express').Router();

societyRouter.post('create', createSocietyController);

module.exports = societyRouter;
