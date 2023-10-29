const { body } = require("express-validator");
const { sha512 } = require("js-sha512");
const { sign, verify } = require("jsonwebtoken");

const mongo = require("../mongo");
const { isRequestInvalid } = require("../utils/http-validation");

const KEY_TOKEN = "eS+e-mcL']t,_|<5PE9(whE2Z0,[TH[G";
const EXPIRATION_TIME = 3 * 24 * 60 * 60;

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function ensureAuthorized (req, res, next) {
	const token = req.headers["x-access-token"];
	if (!token) {
		res.status(403).json({ message: "Acesso não autorizado. A sessão do usuário é inválida." });
		return res.end();
	}

	verify(token, KEY_TOKEN, (error, user) => {
		if (error) {
			res.status(403).json({
				message: "Acesso não autorizado. A sessão do usuário é inválida.",
				expired: error.name === "TokenExpiredError",
				error
			});
			return res.end();
		}

		res.locals.user = user;
		next(null);
	});
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function login (req, res) {
	if (isRequestInvalid(req, res)) return;

	try {
		// Faz o hash da senha antes de fazer o login
		const password = sha512(req.body.password);

		const user = await mongo.Users.findOne({ username: req.body.username, password });
		if (!user)
			return res.status(403).json({ message: "Usuário ou senha incorretos." });

		const token = sign({ username: user.username }, KEY_TOKEN, { expiresIn: EXPIRATION_TIME });
		res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro ao fazer login.", error });
	}
}

login.validations = [
	body("username").isString().withMessage("Usuário inválido."),
	body("password").isString().withMessage("Senha inválida.")
];

module.exports = {
	ensureAuthorized,
	login
};
