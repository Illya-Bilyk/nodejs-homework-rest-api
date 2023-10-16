const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../utils");

async function getAll(req, res) {
  const result = await listContacts();
  res.json(result);
}

async function getById(req, res) {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
}

async function add(req, res) {
  const result = await addContact(req.body);
  res.status(201).json(result);
}

async function remove(req, res) {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
}

async function update(req, res) {
  const { contactId } = req.params;
  const result = await updateById(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
}

module.exports = {
  listContacts: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getById),
  addContact: ctrlWrapper(add),
  removeContact: ctrlWrapper(remove),
  updateById: ctrlWrapper(update),
};
