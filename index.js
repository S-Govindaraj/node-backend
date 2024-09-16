const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require('cors');
const connectDB = require("./app/Middleware/database");
const {RequestDecrypt} = require("./app/Middleware/RequestDecrypt");

const app = express();
connectDB();
app.set('trust proxy', true)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json());
// Allow cros origin
app.use(cors({
  origin: '*'
}));


// Request Decrypt
app.use(RequestDecrypt);


// setting the view engine to ejs
app.set("view engine", "ejs");

// public path setting
app.use("/public", express.static("public"));

// API Routing
app.use("/api", require("./app/routes/api"));

const HOST = config.get("HOST");
const PORT = config.get("PORT");

// Start the server if not being required by a test file
if (!module.parent) {
  const server = app.listen(PORT, () => {
    console.log(`Node server running on http://${HOST}:${PORT}`);
  });
}

 module.exports = app;