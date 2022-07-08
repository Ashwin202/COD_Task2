const updateRouter = require("./update");
const loginRouter = require("./login");
const registerRouter = require("./register");

module.exports = (app, con) => {
  updateRouter(app, con);
  loginRouter(app, con);
  registerRouter(app, con);
};
