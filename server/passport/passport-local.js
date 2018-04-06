import passport from "passport";
import User from "../schemas/user";
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        }
        const newUser = new User();
        newUser.username = req.body.username,
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        console.log("NEW USER", newUser);
        newUser.save(err => {
          done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user || !user.validUserPassword(password)) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);
