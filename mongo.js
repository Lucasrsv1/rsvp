const mongoose = require("mongoose");

const MONGO_HOST = process.env.MONGO_HOST || "127.0.0.1:27017";

let connected = false;
const client = mongoose.connection;

client.on("error", error => {
	console.error("Mongo connection error:", error);
});

client.on("open", () => {
	connected = true;
	console.info("Mongo connected.");
});

client.on("reconnected", () => {
	connected = true;
	console.info("Mongo reconnected.");
});

client.on("disconnected", () => {
	connected = false;
	console.info("Mongo disconnected.");
});

// Inicializa conexão
async function forceConnect () {
	try {
		await mongoose.connect(
			`mongodb://${MONGO_HOST}/rsvp`,
			{ useNewUrlParser: true, useUnifiedTopology: true }
		);
	} catch (error) {
		console.error("Mongo connection error:", error);
		forceConnect();
	}
}

forceConnect();

const usersSchema = new mongoose.Schema({
	username: String,
	password: String
});

const answersSchema = new mongoose.Schema({
	name: String,
	plusOne: { type: String, default: null },
	message: { type: String, default: null }
});

const Users = mongoose.model("Users", usersSchema);
const Answers = mongoose.model("Answers", answersSchema);

module.exports = {
	client,
	Users,
	Answers,
	get connected () {
		return connected;
	}
};
