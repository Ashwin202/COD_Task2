const updateRouter = require("./update");
const loginRouter = require("./login");

module.exports = (app, con) => {
  updateRouter(app, con);
  loginRouter(app, con);
};
