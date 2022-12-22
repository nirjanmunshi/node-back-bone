const express = require("express");
const dotenv = require("dotenv");

const logger = require("./src/log/logger");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// logger
app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", require("./routes/api/api_contact"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
