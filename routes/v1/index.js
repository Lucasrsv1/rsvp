const v1 = require("express").Router();

const loginRouter = require("./login");
const generalRoutes = require("./general");
const answersRoutes = require("./answers");

v1.use("/", generalRoutes);

v1.use("/answers", answersRoutes);

v1.use(loginRouter);

module.exports = v1;
