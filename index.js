const express = require("express");
const dotenv = require("dotenv");
const contacts = require("./src/model/contact");

const logger = require("./src/log/logger");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(logger);

app.get("/api/contacts", (req, res) => {
  res.send(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const memberList = contacts.items;
  const found = memberList.some((m) => m.id === parseInt(req.params.id));
  if (found) {
    res.json(
      memberList.filter((member) => member.id === parseInt(req.params.id))
    );
  } else {
    res.status(404).json({ msg: "Record not found" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
