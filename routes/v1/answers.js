const answersRoutes = require("express").Router();

const { list, save } = require("../../controllers/answers");
const { ensureAuthorized } = require("../../controllers/login");

answersRoutes.get("/", ensureAuthorized, list);
answersRoutes.post("/", save.validations, save);

module.exports = answersRoutes;
