const express = require("express");
const router = express.Router();

const uuid = require("uuid");
const contacts = require("../../src/model/contact");

// get all members
router.get("/", (req, res) => {
  res.send(contacts);
});

// get single member by id
router.get("/:id", (req, res) => {
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

// create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    enabled: true,
  };

  if (!newMember.name || !newMember.email || !newMember.number) {
    return res
      .status(400)
      .json({ msg: "Field required : `name` and `email` and `number`" });
  }

  contacts.items.push(newMember);
  res.json(contacts);
});

// update member
// get single member by id
router.put("/:id", (req, res) => {
  const memberList = contacts.items;
  const found = memberList.some((m) => m.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    contacts.items.forEach((m) => {
      if (m.id === parseInt(req.params.id)) {
        m.name = updateMember.name ? updateMember.name : m.name;
        m.email = updateMember.email ? updateMember.email : m.email;
        m.number = updateMember.number ? updateMember.number : m.number;

        res.json({ msg: "Member updated", member: m });
      }
    });
    console.dir(res.headersSent);
    res.json(
      memberList.filter((member) => member.id === parseInt(req.params.id))
    );
    console.dir(res.headersSent);
  } else {
    res
      .status(404)
      .json({ msg: `No member found with the id ${req.body.id} ` });
  }
});

module.exports = router;
