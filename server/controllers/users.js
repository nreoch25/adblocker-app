import passport from "passport";
import userValidation from "../middleware/userValidation";

export default {
  setRouting: function(router) {
    router.post("/auth/signup", userValidation.signupValidation, (req, res, next) => {
      passport.authenticate("local.signup", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(422)
            .send({ error: "Email address is already in use" });
        }
        req.login(user, err => {
          if (err) {
            return next(err);
          }
          return res.send({
            user: { username: req.user.username, type: req.user.type }
          });
        });
      })(req, res, next);
    });
  }
}
