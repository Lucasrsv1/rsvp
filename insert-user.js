const { sha512 } = require("js-sha512");

const mongo = require("./mongo");

async function run () {
	try {
		await mongo.Users.deleteMany({ username: "user" });

		await mongo.Users.insertMany([{
			username: "user",
			password: sha512(sha512("password"))
		}]);

		console.log("Usuário inserido com sucesso!");
	} catch (error) {
		console.error(error);
	}

	process.exit(0);
}

run();
