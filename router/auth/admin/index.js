const authRouter = require('express').Router();
const middleware = require('../../../middleware/index');
const AdminValidationsObject = require('../../../validations/admin-validation');

// TODO: Admin Sign Up
// TODO: Admin Sign in
// TODO: Admin profile Update
// TODO: Admin account delete

authRouter.post('/register', middleware(AdminValidationsObject.createAdmin, AdminValidationsObject), () => {});

module.exports = { authRouter };
