const authRouter = require('express').Router();
const validationMiddleware = require('../../../middleware/index');
const AdminValidationsObject = require('../../../validations/admin-validation');

const { adminSignUpController, adminSignInController, adminUpdateController } = require('../../../controller/admin/index');

authRouter.post('/register', validationMiddleware(AdminValidationsObject.createAdmin, AdminValidationsObject), adminSignUpController);
authRouter.post('/login', validationMiddleware(AdminValidationsObject.loginAdmin, AdminValidationsObject), adminSignInController);
authRouter.put('/update', validationMiddleware(AdminValidationsObject.updateAdmin, AdminValidationsObject), adminUpdateController);

module.exports = authRouter;
