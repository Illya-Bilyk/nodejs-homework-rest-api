const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../utils");

async function getAll(req, res) {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
}

async function getById(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
}

async function add(req, res) {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

async function remove(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
}

async function update(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeContact: ctrlWrapper(remove),
  updateById: ctrlWrapper(update),
  updateStatusContact: ctrlWrapper(update),
};
