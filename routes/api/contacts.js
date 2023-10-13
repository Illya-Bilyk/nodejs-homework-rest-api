const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
} = require("../../controllers/contacts");
const { schema, validateBody } = require("../../validate");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(schema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(schema), updateById);

module.exports = router;
