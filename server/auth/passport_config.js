const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bycrypt");
function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    const user = getUser(username);
    if (user == null) {
      return done(null, false, "no user"); //fun(error,user return,message)
    }
  };
  passport.use(
    new LocalStrategy({ usernameFeild: "username" }, authenticateUser)
  );
  passport.serializeUser(function (user, done) {});

  passport.deserializeUser(function (user, done) {
    {
    }
  });
}
