export default {
  signupValidation: (req, res, next) => {
    console.log(req.body);
    req.checkBody("username", "Username is required").notEmpty();
    req
      .checkBody("username", "Username: miniumum 5 characters")
      .isLength({ min: 5 });
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is invalid").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password", "Password: minimum 5 characters")
      .isLength({ min: 5 });

    req
      .getValidationResult()
      .then(result => {
        const errors = result.array();
        const messages = [];
        errors.forEach(error => {
          messages.push(error.msg);
        });
        if (messages.length === 0) {
          return next();
        }
        return res.status(422).send({ error: messages });
      })
      .catch(err => {
        return next();
      });
  },
  loginValidation: (req, res, next) => {
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is invalid").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password", "Password must not be less than 5 characters")
      .isLength({ min: 5 });

    req
      .getValidationResult()
      .then(result => {
        const errors = result.array();
        const messages = [];
        errors.forEach(error => {
          messages.push(error.msg);
        });
        if (messages.length === 0) {
          return next();
        }
        return res.status(422).send({ error: messages });
      })
      .catch(err => {
        return next();
      });
  }
};
