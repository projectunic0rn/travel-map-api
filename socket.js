const io = require("socket.io-client");
require("dotenv").config();

const socket = io(process.env.SOCKET_SERVICE_URL);

module.exports = socket;
