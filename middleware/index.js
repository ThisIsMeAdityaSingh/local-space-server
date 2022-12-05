function validationMiddleware (validationFunction, parentObject) {
  const validation = validationFunction.bind(parentObject);

  return function (req, res, next) {
    const { error, message } = validation(req.body);

    if (error) {
      res.status(400);
      res.json({
        error,
        message
      });
    } else {
      next();
    }
  };
};

module.exports = { validationMiddleware };
