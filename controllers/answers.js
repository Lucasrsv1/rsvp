const { body } = require("express-validator");

const mongo = require("../mongo");
const { isRequestInvalid } = require("../utils/http-validation");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function list (req, res) {
	try {
		const results = await mongo.Answers.find({}, { _id: 0, name: 1, plusOne: 1, message: 1 });
		res.status(200).json(results);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function save (req, res) {
	if (isRequestInvalid(req, res)) return;

	try {
		await mongo.Answers.insertMany([req.body]);
		res.status(201).json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
}

save.validations = [
	body("name").isString().withMessage("Nome inválido."),
	body("plusOne").optional().isString().withMessage("Nome do acompanhante inválido."),
	body("message").optional().isString().withMessage("Mensagem inválida.")
];

module.exports = { list, save };
